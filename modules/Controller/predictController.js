const { Storage } = require("@google-cloud/storage");
const httpStatus = require("http-status");
const multer = require('multer');
const Response = require("../Model/Response");
const path = require('path');
const axios = require('axios');
const { Readable } = require('stream');
const FormData = require('form-data');
const Penanganan = require("../Model/Penanganan")

const storage = new Storage({
  projectId: 'capstone-project-387217',
  keyFilename: './serviceaccountkey.json'
});

const upload = multer({
  storage: multer.memoryStorage({}),
});


const postPredictImage = async (req, res) => {
   const bucketName = storage.bucket('storing-image-artikel');
   try {
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
  
    const blob = bucketName.file("predictImages/" + file.originalname);
    const blobStream = blob.createWriteStream();
    blobStream.end(file.buffer);

    await new Promise((resolve, reject) => {
      blobStream.on('finish', resolve);
      blobStream.on('error', reject);
    });
    const imageUrl = `https://storage.googleapis.com/${bucketName.name}/${blob.name}`;

    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(imageResponse.data, 'binary');

    // Create a new FormData object
    const formData = new FormData();
    formData.append('file', imageBuffer, 'image.jpg');
    console.log
    const cloudRunResponse = await axios.post('https://ml-waste-image-ctjdvmzs5q-et.a.run.app/predict/', formData, {
      headers: formData.getHeaders(),
    });
    const predictionResult = cloudRunResponse.data;
    const jsonString = JSON.stringify(predictionResult);
    console.log(jsonString);
    //res.json({ prediction: jsonString });
    response = new Response.Success(false, "Success" , jsonString);
    const data = JSON.parse(response.data);
    const test = data['Prediction result'];
    console.log(test);
    // const penanganan = await Penanganan.findOne({
    //   name: test,
    // });
    response = new Response.Success(false, "Success" , test);
    res.status(httpStatus.OK).json(response);
  } catch (error) {
    response = new Response.Error(true, error.message);
    res.status(httpStatus.BAD_REQUEST).json(response);
  }
};


module.exports = {
  upload: upload.single('image'),
  postPredictImage,
};
