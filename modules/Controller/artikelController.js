const { Storage } = require("@google-cloud/storage");
const Artikel = require('../Model/Artikel');
const httpStatus = require("http-status");
const multer = require('multer');
const Response = require("../Model/Response");
const artikelValidator = require("../Utils/ArtikelValidator");

const storage = new Storage({
  projectId: 'capstone-project-387217',
});

const upload = multer({
  storage: multer.memoryStorage({}),
});


const postArtikel = async (req, res) => {
  const bucketName = storage.bucket('storing-image-artikel');
  try {
    const file = req.file;
    const request = await artikelValidator.validateAsync(req.body);
    if (!req.file) {
      const response = new Response.Error(400, "Please upload a image!");
      return res.status(httpStatus.BAD_REQUEST).json(response);
    }

    const ext = req.file.originalname.split('.').pop();
    if (ext !== "png" && ext !== "jpg" && ext !== "jpeg" && ext !== "PNG" && ext !== "JPG" && ext !== "JPEG") {
      const response = new Response.Error(400, "Only images are allowed");
      return res.status(httpStatus.BAD_REQUEST).json(response);
    }

    const blob = bucketName.file("images/" + file.originalname);
    const blobStream = blob.createWriteStream();
    blobStream.end(file.buffer);

    await new Promise((resolve, reject) => {
      blobStream.on('finish', resolve);
      blobStream.on('error', reject);
    });
    const artikelUrl = `https://storage.googleapis.com/${bucketName.name}/${blob.name}`;

    const username = req.user.username;
    request.username = username;
    request.imgUrl = artikelUrl;

    const image = new Artikel(request);
    const result = await image.save();

    const response = new Response.Success(false, "Success Adding Artikel", result);
    res.status(httpStatus.OK).json(response);
  } catch (error) {
    const response = new Response.Error(true, error.message);
    res.status(httpStatus.BAD_REQUEST).json(response);
  }
};


const getArtikel = async (req, res) => {
  try {
    const { input } = req.query;
    let query = {};

    if (input) {
      query.$or = [
        { username: { $regex: input, $options: "i" } },
        { title: { $regex: input, $options: "i" } },
        { jenisSampah: { $regex: input, $options: "i" } },
        { content: { $regex: input, $options: "i" } }
      ];
    }

    const artikel = await Artikel.find(query);

    if (artikel.length === 0) {
      const response = new Response.Error(true, "No results found");
      res.status(httpStatus.BAD_REQUEST).json(response);
      return;
    } else {
      artikel.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
      const response = new Response.Success(false, "Artikel fetched successfully", artikel);
      res.status(httpStatus.OK).json(response);
    }

  } catch (error) {
    const response = new Response.Error(true, error.message);
    res.status(httpStatus.BAD_REQUEST).json(response);
  }
};

const deleteArtikel = async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.user;
    const artikel = await Artikel.findOne({ _id: id, username });

    if (!artikel) {
      const response = new Response.Error(true, "You don't have access to delete this Artikel");
      return res.status(httpStatus.BAD_REQUEST).json(response)
    }

    await Artikel.findByIdAndDelete(id);
    const response = new Response.Success(false, "Artikel Deleted success", artikel);
    res.status(httpStatus.OK).json(response)
  } catch (error) {
    const response = new Response.Error(true, error.message);
    res.status(httpStatus.BAD_REQUEST).json(response);
  }
};

const updateArtikel = async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.user;
    const artikel = await Artikel.findOne({ _id: id, username });

    if (!artikel) {
      const response = new Response.Error(true, "You don't have access to update this Artikel");
      return res.status(httpStatus.BAD_REQUEST).json(response)
    }

    await Artikel.findByIdAndUpdate(id, req.body);
    await artikelValidator.validateAsync(req.body);

    const response = new Response.Success(false, "Artikel Update success", artikel);
    res.status(httpStatus.OK).json(response)
  } catch (error) {
    const response = new Response.Error(true, error.message);
    res.status(httpStatus.BAD_REQUEST).json(response);
  }
};


module.exports = {
  upload: upload.single('image'),
  postArtikel,
  getArtikel,
  deleteArtikel,
  updateArtikel
};
