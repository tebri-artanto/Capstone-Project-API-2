const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const User = require("../Model/User");
const Response = require("../Model/Response");
const clearToken = require("../Utils/clearToken");
const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");

const client = new SecretManagerServiceClient();
const getSecretValue = async () => {
  const [version] = await client.accessSecretVersion({
    name: "projects/377381526885/secrets/key/versions/1",
  });
  const connectionString = version.payload.data.toString("utf8");
  return connectionString;
};

const requireAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  const response = new Response.Error(true, "Unauthorized");
  const connectionString = await getSecretValue();
  if (!token) {
    res.status(httpStatus.UNAUTHORIZED).json(response);
    return;
  }

  try {
    const myToken = clearToken(token);
    const decodedToken = jwt.verify(myToken, connectionString);
    const userId = decodedToken.id;
    const user = await User.findById(userId);

    if (!user) {
      res.status(httpStatus.UNAUTHORIZED).json(response);
      return;
    }

    req.userId = userId;
    req.user = user;
    next();
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).json(response);
  }
};

module.exports = requireAuth;
