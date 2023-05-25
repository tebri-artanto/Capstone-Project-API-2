const mongoose = require('mongoose')

const pengepulSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true,
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
    contact:{
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    }
});

const Pengepul = mongoose.model("Pengepul", pengepulSchema);

module.exports = Pengepul;