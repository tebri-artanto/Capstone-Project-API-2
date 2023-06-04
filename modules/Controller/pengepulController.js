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
      response = new Response.Error(true, "No results found");
      res.status(httpStatus.BAD_REQUEST).json(response);
      return;
    } else {
      response = new Response.Success(false, "Results found", pengepul);
    }

    res.status(httpStatus.OK).json(response);
  } catch (error) {
    response = new Response.Error(true, error.message);
    res.status(httpStatus.BAD_REQUEST).json(response);
  }
};


module.exports = { pengepulSignUp, getPengepul };
