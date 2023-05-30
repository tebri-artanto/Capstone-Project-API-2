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

    response = new Response.Success(false, null, result);
    res.status(httpStatus.OK).json(response);
  } catch (error) {
    response = new Response.Error(true, error.message);
    res.status(httpStatus.BAD_REQUEST).json(response);
  }
};

const getPengepul = async (req, res) => {
  let response = null;
  try {
    const { username, location } = req.query;

    let query = {};

    if (username) {
      query.username = { $regex: username, $options: "i" };
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    const pengepul = await Pengepul.find(query);

    if (pengepul.length === 0) {
      response = new Response.Error(true, "No results found");
    } else {
      response = new Response.Success(false, null, pengepul);
    }

    res.status(httpStatus.OK).json(response);
  } catch (error) {
    response = new Response.Error(true, error.message);
    res.status(httpStatus.BAD_REQUEST).json(response);
  }
};

module.exports = { pengepulSignUp, getPengepul };
