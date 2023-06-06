const mongoose = require('mongoose');

const penangananSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
});

const Penanganan = mongoose.model("Penanganan", penangananSchema);

module.exports = Penanganan;
