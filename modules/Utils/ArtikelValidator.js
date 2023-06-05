const Joi = require("joi");

const artikelValidator = Joi.object({
    title: Joi.string().required(),
    jenisSampah: Joi.string().required(),
    content: Joi.string().required(),
});

module.exports = artikelValidator;
