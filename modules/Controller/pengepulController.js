const httpStatus = require("http-status");
const Response = require("../Model/Response");
const Pengepul = require("../Model/Pengepul");
const pengepulValidator = require("../Utils/PengepulValidator");

const pengepulSignUp = async (req, res) => {
  try {
    const request = await pengepulValidator.validateAsync(req.body);

    const pengepul = await Pengepul.findOne({ username: req.user.username });
    if (pengepul) {
      const response = new Response.Error(false, "You are already a Collector");
      return res.status(httpStatus.OK).json(response);
    }

    const username = req.user.username;
    request.username = username;

    const newPengepul = new Pengepul(request);
    const result = await newPengepul.save();

    const response = new Response.Success(false, "You are now a Collector", result);
    res.status(httpStatus.OK).json(response);
  } catch (error) {
    const response = new Response.Error(true, error.message);
    res.status(httpStatus.BAD_REQUEST).json(response);
  }
};


const getPengepul = async (req, res) => {
  try {
    const { input } = req.query;

    let query = {};

    if (input) {
      query.$or = [
        { username: { $regex: input, $options: "i" } },
        { location: { $regex: input, $options: "i" } }
      ];
    }

    const pengepul = await Pengepul.find(query);

    if (pengepul.length === 0) {
      const response = new Response.Error(true, "No results found");
      return res.status(httpStatus.BAD_REQUEST).json(response);
    } else {
      pengepul.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
      const response = new Response.Success(false, "Results found", pengepul);
    }

    res.status(httpStatus.OK).json(response);
  } catch (error) {
    const response = new Response.Error(true, error.message);
    res.status(httpStatus.BAD_REQUEST).json(response);
  }
};

const getPengepulByUsername = async (req, res) => {
  try {
    const pengepul = await Pengepul.find({'username': req.params.username});

    const response = new Response.Success(false, "Results found", pengepul);
    res.status(httpStatus.OK).json(response); 
  } catch (error) {
    const response = new Response.Error(true, error.message);
    res.status(httpStatus.BAD_REQUEST).json(response);
  }
};

const deletePengepul = async (req,res) =>{
  try{
    const pengepul = await Pengepul.findOne({ username : req.user.username });
    if(!pengepul){
      const response = new Response.Error(true, "You don't have access to delete this Pengepul");
      return res.status(httpStatus.BAD_REQUEST).json(response)
    }
    await Pengepul.findByIdAndDelete(pengepul.id);

    const response = new Response.Success(false, "Pengepul Deleted success", pengepul);
    res.status(httpStatus.OK).json(response)
  }catch (error){
    const response = new Response.Error(true, error.message);
    return res.status(httpStatus.BAD_REQUEST).json(response);
  }
}

const updatePengepul = async (req, res) => {
  try {
    const pengepul = await Pengepul.findOne({ username : req.user.username });
    if (!pengepul) {
      const response = new Response.Error(true, "You don't have access to update this Pengepul");
      return res.status(httpStatus.BAD_REQUEST).json(response);
    }

    await pengepulValidator.validateAsync(req.body);
    await Pengepul.findByIdAndUpdate(pengepul.id, req.body); 

    const response = new Response.Success(false, "Pengepul Update success", pengepul);
    res.status(httpStatus.OK).json(response);
  } catch (error) {
    const response = new Response.Error(true, error.message);
    res.status(httpStatus.BAD_REQUEST).json(response);
  }
};


module.exports = { pengepulSignUp, getPengepul, getPengepulByUsername, deletePengepul, updatePengepul };
