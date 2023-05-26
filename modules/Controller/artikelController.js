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
  // fileFilter: (req, file, cb) => {
  //   const allowedMimes = ['image/jpeg', 'image/png'];
  //   if (allowedMimes.includes(file.mimetype)) {
  //     cb(null, true);
  //   } else {
  //     cb(new Error('Invalid file format. Only JPEG, PNG files are allowed.'));
  //   }
  // },
});

// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: maxSize },
// });

const postArtikel = async (req, res) => {
  // if (!req.file) {
  //   return res.status(400).send('No File Uploaded.');
  // }

   const bucketName = storage.bucket('storing-image-artikel');
   const file = req.file;
  if (!req.file) {
    const response = new Response.Error(400, "Please upload a image!" );
    return res.status(httpStatus.BAD_REQUEST).json(response);
  }
  //const file = storage.bucket('storing-image-artikel').file(req.file.originalname.toLowerCase().split(" ").join("-"));

  

  // Create a writable stream to upload the file contents
  
  // await file.save(req.file.path);
  // await file.save(req.file.path);

  const ext = req.file.originalname.split('.').pop();
  if (ext !== "png" && ext !== "jpg" && ext !== "jpeg" && ext !== "PNG" && ext !== "JPG" && ext !== "JPEG") {
    const response = new Response.Error(400, "Only images are allowed" );
    return res.status(httpStatus.BAD_REQUEST).json(response);
  }

  // const blob = storage.bucket('storing-image-artikel').file(req.file.originalname.toLowerCase().split(" ").join("-"));
  // const blobStream = blob.createWriteStream();


  //const imageUrl = `https://storage.googleapis.com/${bucketName}/${file.name}`;

  // Menyimpan data gambar ke MongoDB
  

  try {
    const blob = bucketName.file(file.originalname);

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
    // blobStream.on("error", (err) => {
    //   const response = new Response.Error(500, err.message );
    //   return res.status(httpStatus.BAD_REQUEST).json(response);
    // });
  
    // blobStream.on("uploaded", async (data) => {
    //   const artikelUrl = format(
    //     `https://storage.googleapis.com/${bucketName.name}/${blob.name.toLowerCase()}`
    //   );
    // });
    
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

// const storage = new Storage({
//   projectId: 'capstone-project-387217',
//   keyFilename: './serviceaccountkey.json'
// });

// const upload = multer({
//   storage: multer.diskStorage({}),
//   fileFilter: (req, file, cb) => {
//     const allowedMimes = ['image/jpeg', 'image/png'];
//     if (allowedMimes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error('Invalid file format. Only JPEG, PNG files are allowed.'));
//     }
//   },
// });



// const bucketName = 'storing-image-artikel';


// const postArtikel = async (req, res) => {
//     let response = null;
//     try{

//         // await processFile(req, res);
    
//         if (!req.file) {
//           const response = new Response.Error(400, "Please upload a image!" );
//           return res.status(httpStatus.BAD_REQUEST).json(response);
//         }

//         const ext = req.file.originalname.split('.').pop();
//         if (ext !== "png" && ext !== "jpg" && ext !== "jpeg" && ext !== "PNG" && ext !== "JPG" && ext !== "JPEG") {
//           const response = new Response.Error(400, "Only images are allowed" );
//           return res.status(httpStatus.BAD_REQUEST).json(response);
//         }
    
        // const blob = bucket.file("images/" + req.file.originalname.toLowerCase().split(" ").join("-"));
        // const blobStream = blob.createWriteStream({
        //   resumable: false,
        // });
    
        // blobStream.on("error", (err) => {
        //   const response = new Response.Error(500, err.message );
        //   return res.status(httpStatus.BAD_REQUEST).json(response);
        // });
    
//         // blobStream.on("uploaded", async (data) => {
//         //   const artikelUrl = format(
//         //     `https://storage.googleapis.com/${bucket.name}/${blob.name.toLowerCase()}`
//         //   );
//         // });

        
//         const file = storage.bucket(bucketName).file(req.file.filename);
//         await file.save(req.file.path);

//         const artikelUrl = `https://storage.googleapis.com/${bucketName}/${file.name}`;
//         // const requestName = req.file.originalname.replace(/\.[^/.]+$/, "");
//         // const artikelName = requestName.charAt(0).toUpperCase() + requestName.slice(1);
//         const { title, content } = req.body;
//         const artikel = new Artikel({
//             title,
//             content,
//             imgUrl: artikelUrl,
//         });

//         const artikelSave = await artikel.save();
//         response = new Response.Success(false, null, artikelSave);
//         res.status(httpStatus.OK).json(response);

//         blobStream.end(req.file.buffer);
//     } catch (error) {
//     response = new Response.Error(true, error.message);
//     res.status(httpStatus.BAD_REQUEST).json(response);
//   }
// };

// module.exports = { upload: upload.single('image'), postArtikel };

// const getUploads = async (req, res) => {
//   let response = null;
//   try{
//     const images = await Upload.find();

//     response = new Response.Success(false, null, images);
//     res.status(httpStatus.OK).json(response);
//   } catch (error) {
//     response = new Response.Error(true, error.message);
//     res.status(httpStatus.BAD_REQUEST).json(response);
//   }
// };

// const deleteUpload = async (req, res) => {
//   let response = null;
//   try {
//     // cloud storage delete image
//     const findImg = await Upload.findOne({
//       _id: req.query.id,
//     });
//     const ext = path.extname(findImg.url);
//     const findName = findImg.name;
//     const fileName = findName + "" + ext;
//     const blob = bucket.file("images/" + fileName.toLowerCase().split(" ").join("-"));
//     const deleted = await blob.delete();

//     console.log(`gs://${bucket.name}/${blob.name} deleted`);

//     // mongodb delete data
//     const deleteImg = await Upload.findByIdAndDelete(req.query.id);
//     if(!deleteImg) {
//       response = new Response.Error(true, notFoundId);
//       res.status(httpStatus.BAD_REQUEST).json(response);
//       return;
//     }
//     response = `Detele ${blob.name} Success!`;
//     res.status(httpStatus.OK).json({ message: response});
//   } catch (error) {
//     response = new Response.Error(true, error.message);
//     res.status(httpStatus.BAD_REQUEST).json(response);
//   }
// }


