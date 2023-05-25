const mongoose = require('mongoose')

const artikelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique:true,
    },
    content: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        default: Date.now,
    },
});

const Artikel = mongoose.model("Artikel", artikelSchema);

module.exports = Artikel;