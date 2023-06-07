const httpStatus = require("http-status");
const Response = require("../Model/Response");
const Penanganan = require("../Model/Penanganan");
const penangananValidator = require("../Utils/PenangananValidator");

const postPenanganan = async (req, res) => {
  let response = null;
  try {
    const request = await penangananValidator.validateAsync(req.body);
    
    const newPenanganan = new Penanganan(request);
    const result = await newPenanganan.save();

    response = new Response.Success(false, "Berhasil Mendaftar", result);
    res.status(httpStatus.OK).json(response);
  } catch (error) {
    response = new Response.Error(true, error.message);
    res.status(httpStatus.BAD_REQUEST).json(response);
  }
};


// const getPenanganan = async (req, res) => {
//   let response = null;
//   try {
//     const { input } = req.query;

//     let query = {};

//     if (input) {
//       query.$or = [
//         { username: { $regex: input, $options: "i" } },
//         { location: { $regex: input, $options: "i" } }
//       ];
//     }

//     const penanganan = await Penanganan.find(query);

//     if (penanganan.length === 0) {
//       response = new Response.Error(true, "No results found");
//       res.status(httpStatus.BAD_REQUEST).json(response);
//       return;
//     } else {
//       response = new Response.Success(false, "Results found", penanganan);
//     }

//     res.status(httpStatus.OK).json(response);
//   } catch (error) {
//     response = new Response.Error(true, error.message);
//     res.status(httpStatus.BAD_REQUEST).json(response);
//   }
// };

// const deletePenanganan = async (req,res) =>{
//   try{
//     const { id } = req.params;
//     const { username } = req.user;

//     const penanganan = await Penanganan.findOne({ _id : id, username});

//     if(!penanganan){
//       const response = new Response.Error(true, "You don't have access to delete this Penanganan");
//       return res.status(httpStatus.BAD_REQUEST).json(response)
//     }

//     await Penanganan.findByIdAndDelete(id);

//     const response = new Response.Success(false, "Penanganan Deleted success", penanganan);
//     res.status(httpStatus.OK).json(response)
//   }catch (error){
//     const response = new Response.Error(true, error.message);
//     return res.status(httpStatus.BAD_REQUEST).json(response);
//   }
// }

module.exports = { postPenanganan };
