const Joi = require("joi");

const userValidator = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(255).required(),
});

module.exports = userValidator;