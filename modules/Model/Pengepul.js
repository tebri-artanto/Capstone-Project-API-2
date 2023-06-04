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
    type: Number,
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
  },
  lon: {
    type: Number,
  },
});

pengepulSchema.pre('save', async function(next) {
    const pengepul = this;
  
    // Cari dokumen terkait dalam koleksi "User"
    const user = await User.findOne({ username: pengepul.username });
  
    // Jika dokumen user ditemukan, update nilai createDate
    if (user) {
        pengepul.username = user.username;
    } else {
        // Jika dokumen user tidak ditemukan, lempar error atau berikan penanganan sesuai kebutuhan
        throw new Error('User not found');
    }
  
    next();
});
  

const Pengepul = mongoose.model('Pengepul', pengepulSchema);

module.exports = Pengepul;
