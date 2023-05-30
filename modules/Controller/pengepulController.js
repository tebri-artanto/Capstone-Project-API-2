const httpStatus = require("http-status");
const Response = require("../Model/Response");
const Pengepul = require("../Model/Pengepul");
const pengepulValidator = require("../Utils/PengepulValidator");


const pengepulSignUp = async (req, res) => {
  let response = null;
  try {
    const request = await pengepulValidator.validateAsync(req.body);

    const pengepul = await Pengepul.findOne({ username: request.username });
    if (pengepul) {
      response = new Response.Error(true, "Name already exists");
      return res.status(httpStatus.BAD_REQUEST).json(response);
    }

    const newPengepul = new Pengepul(request);
    const result = await newPengepul.save();

    response = new Response.Success(false, "Success Adding Pengepul", result);
    res.status(httpStatus.OK).json(response);
  } catch (error) {
    response = new Response.Error(true, error.message);
    res.status(httpStatus.BAD_REQUEST).json(response);
  }
};

const getPengepul = async (req,res) =>{
  let response = null;
  try{
    const {username, location } = req.query;

    let query = {};

    if(username) {
      query.username = username
    }

    if(location){
      query.location = location
    }

    const pengepul = await Pengepul.find(query);

    response = new Response.Success(false, "Pengepul fetched successfully", pengepul);
    res.status(httpStatus.OK).json(response);
  }catch(error){
    response = new Response.Error(true, error.message);
    res.status(httpStatus.BAD_REQUEST).json(response);
  };
};

module.exports = {pengepulSignUp, getPengepul}
