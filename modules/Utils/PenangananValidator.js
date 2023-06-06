const Joi = require("joi");

const penagananValidator = Joi.object({
    name: Joi.string().required(),
    description : Joi.string().required(),
});

module.exports = penagananValidator;
