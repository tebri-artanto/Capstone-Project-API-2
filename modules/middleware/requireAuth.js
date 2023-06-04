const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const User = require("../Model/User");
const Response = require("../Model/Response");
const clearToken = require("../Utils/clearToken");

const requireAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  const response = new Response.Error(true, "Unauthorized");

  if (!token) {
    res.status(httpStatus.UNAUTHORIZED).json(response);
    return;
  }

  try {
    const myToken = clearToken(token);
    const decodedToken = jwt.verify(myToken, process.env.KEY);
    const userId = decodedToken.id;
    const user = await User.findById(userId);

    if (!user) {
      res.status(httpStatus.UNAUTHORIZED).json(response);
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).json(response);
  }
};

module.exports = requireAuth;
