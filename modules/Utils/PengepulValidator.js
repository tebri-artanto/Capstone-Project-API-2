const Joi = require("joi");

const pengepulValidator = Joi.object({
    username: Joi.string().required(),
    contact: Joi.number().required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
});

module.exports = pengepulValidator;
