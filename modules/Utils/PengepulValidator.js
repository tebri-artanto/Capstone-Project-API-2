const Joi = require("joi");

const pengepulValidator = Joi.object({
    contact: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
});

module.exports = pengepulValidator;
