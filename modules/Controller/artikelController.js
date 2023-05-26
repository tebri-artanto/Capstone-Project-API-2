const { Storage } = require("@google-cloud/storage");
const processFile = require("../middleware/uploadImg");
const { format } = require("util");
const Artikel = require('../Model/Artikel');
const httpStatus = require("http-status");
const multer = require('multer');
const Response = require("../Model/Response");
const path = require('path');
const maxSize = 10 * 1024 * 1024;
const pathKey = path.resolve('/serviceaccountkey.json')

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
    const { title, content } = req.body;
    const image = new Artikel({ title, content, imgUrl: artikelUrl });
    await image.save();
    return res.status(200).json({ url: artikelUrl });
    
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal server error.');
  }
};

module.exports = {
  upload: upload.single('image'),
  postArtikel,
};


