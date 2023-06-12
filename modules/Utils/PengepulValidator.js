const Joi = require("joi");

const pengepulValidator = Joi.object({
    contact: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
    lat: Joi.number().optional().default(null),
    lon: Joi.number().optional().default(null),
});

module.exports = pengepulValidator;
