const { Storage } = require("@google-cloud/storage");
const { format } = require("util");
const Artikel = require('../Model/Artikel');
const httpStatus = require("http-status");
const multer = require('multer');
const Response = require("../Model/Response");
const path = require('path');
const maxSize = 10 * 1024 * 1024;
const pathKey = path.resolve('/serviceaccountkey.json')
const artikelValidator = require("../Utils/ArtikelValidator");

const storage = new Storage({
  projectId: 'capstone-project-387217',
  keyFilename: './serviceaccountkey.json'
});

//Konfigurasi multer untuk menyimpan file yang diunggah
const upload = multer({
  storage: multer.memoryStorage({}),
});


const postArtikel = async (req, res) => {
   const bucketName = storage.bucket('storing-image-artikel');
   const file = req.file;
    if (!req.file) {
      const response = new Response.Error(400, "Please upload a image!" );
      return res.status(httpStatus.BAD_REQUEST).json(response);
    }

  const ext = req.file.originalname.split('.').pop();
  if (ext !== "png" && ext !== "jpg" && ext !== "jpeg" && ext !== "PNG" && ext !== "JPG" && ext !== "JPEG") {
    const response = new Response.Error(400, "Only images are allowed" );
    return res.status(httpStatus.BAD_REQUEST).json(response);
  }
  

  try {
    const blob = bucketName.file("images/" + file.originalname);

    // Create a writable stream to upload the file contents
    const blobStream = blob.createWriteStream();

    // Pipe the image data to the writable stream
    blobStream.end(file.buffer);

    // Wait for the upload to finish
    await new Promise((resolve, reject) => {
      blobStream.on('finish', resolve);
      blobStream.on('error', reject);
    });
    const artikelUrl = `https://storage.googleapis.com/${bucketName.name}/${blob.name}`;
    const request = await artikelValidator.validateAsync(req.body);
    const username = req.user.username;
    request.username = username;
    request.imgUrl= artikelUrl;
    const image = new Artikel(request);
    const result = await image.save();
    response = new Response.Success(false, "Success Adding Artikel", result);
    res.status(httpStatus.OK).json(response);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal server error.');
  }
};



const getArtikel = async (req, res) => {
  let response = null;
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
      response = new Response.Error(true, "No results found");
      res.status(httpStatus.BAD_REQUEST).json(response);
      return;
    }else{
      response = new Response.Success(false, "Artikel fetched successfully", artikel);
      res.status(httpStatus.OK).json(response);
    }
     
  } catch (error) {
    response = new Response.Error(true, error.message);
    res.status(httpStatus.BAD_REQUEST).json(response);
  }
};

module.exports = {
  upload: upload.single('image'),
  postArtikel,
  getArtikel,
};
