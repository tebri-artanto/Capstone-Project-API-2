const mongoose = require('mongoose');
const User = require('../Model/User');

const pengepulSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  contact: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    default: null,
  },
  lon: {
    type: Number,
    default: null,
  },
});

pengepulSchema.pre('save', async function (next) {
  const pengepul = this;

  const user = await User.findOne({ username: pengepul.username });
  
  if (user) {
    pengepul.username = user.username;
  } else {
    throw new Error('User not found');
  }

  next();
});


const Pengepul = mongoose.model('Pengepul', pengepulSchema);

module.exports = Pengepul;
