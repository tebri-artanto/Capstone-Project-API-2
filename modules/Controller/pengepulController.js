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
      response = new Response.Error(false, "Anda Sudah Terdaftar");
      return res.status(httpStatus.OK).json(response);
    }

    // Mendapatkan username dari user yang sudah terotentikasi
    const username = req.user.username;

    // Menambahkan nilai username ke objek request pengepul
    request.username = username;

    const newPengepul = new Pengepul(request);
    const result = await newPengepul.save();

    response = new Response.Success(false, "Berhasil Mendaftar", result);
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

const deletePengepul = async (req,res) =>{
  try{
    const { id } = req.params;
    const { username } = req.user;

    const pengepul = await Pengepul.findOne({ _id : id, username});

    if(!pengepul){
      const response = new Response.Error(true, "Tidak memiliki akses menghapus");
      return res.status(httpStatus.BAD_REQUEST).json(response)
    }

    await Pengepul.findByIdAndDelete(id);

    const response = new Response.Success(false, "Pengepul Deleted success", pengepul);
    res.status(httpStatus.OK).json(response)
  }catch (error){
    const response = new Response.Error(true, error.message);
    return res.status(httpStatus.BAD_REQUEST).json(response);
  }
}

module.exports = { pengepulSignUp, getPengepul, deletePengepul };
