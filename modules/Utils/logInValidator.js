const Joi = require("joi");

const logInValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = logInValidator;