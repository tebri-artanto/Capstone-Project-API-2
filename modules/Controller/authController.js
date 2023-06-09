const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const userValidator = require("../Utils/UserValidator");
const logInValidator = require("../Utils/logInValidator");
const bcrypt = require("../Utils/bcrypt");
const User = require("../Model/User");
const Response = require("../Model/Response");

const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");

const client = new SecretManagerServiceClient();
const getSecretValue = async () => {
  const [version] = await client.accessSecretVersion({
    name: "projects/377381526885/secrets/key/versions/1",
  });
  const connectionString = version.payload.data.toString("utf8");
  return connectionString;
};

const signUp = async (req, res) => {
  try {
    const request = await userValidator.validateAsync(req.body);

    const users = await User.findOne({ username: request.username });
    if (users) {
      response = new Response.Error(true, "Username already exist");
      return res.status(httpStatus.BAD_REQUEST).json(response); 
    }

    const mail = await User.findOne({ email: request.email });
    if (mail) {
      response = new Response.Error(true, "Email already exist");
      return res.status(httpStatus.BAD_REQUEST).json(response);
    }

    const hashedPassword = await bcrypt.hash(request.password);
    request.password = hashedPassword;

    const user = new User(request);

    const result = await user.save();
    const response = new Response.Success(false, "Signup Success", result);
    res.status(httpStatus.OK).json(response);
  } catch (error) {
    const response = new Response.Error(true, error.message);
    res.status(httpStatus.BAD_REQUEST).json(response);
  }
};

const logIn = async (req, res) => {
  const connectionString = await getSecretValue();
  try {
    const request = await logInValidator.validateAsync(req.body);

    const user = await User.findOne({ email: request.email });
    if (!user) {
      const response = new Response.Error(true, "Invalid Email");
      return res.status(httpStatus.BAD_REQUEST).json(response);
    }

    const isValidPassword = await bcrypt.compare(
      request.password,
      user.password
    );

    if (!isValidPassword) {
      const response = new Response.Error(true, "Invalid Password");
      return res.status(httpStatus.BAD_REQUEST).json(response);
    }

    const createJwtToken = jwt.sign({ id: user._id }, connectionString);
    const data = { token: createJwtToken, username: user.username };
    const response = new Response.Success(false, "Login Success", data);
    res.status(httpStatus.OK).json(response);
  } catch (error) {
    const response = new Response.Error(true, error.message);
    res.status(httpStatus.BAD_REQUEST).json(response);
  }
};

module.exports = { signUp, logIn };
