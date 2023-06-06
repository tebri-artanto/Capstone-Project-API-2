const mongoose = require('mongoose')
const User = require('../Model/User');

const artikelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique:true,
    },
    jenisSampah: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
});

artikelSchema.pre('save', async function(next) {
    const artikel = this;
  
    // Cari dokumen terkait dalam koleksi "User"
    const user = await User.findOne({ username: artikel.username });
  
    // Jika dokumen user ditemukan, update nilai createDate
    if (user) {
        artikel.username = user.username;
    } else {
        // Jika dokumen user tidak ditemukan, lempar error atau berikan penanganan sesuai kebutuhan
        throw new Error('User not found');
    }
  
    next();
});

const Artikel = mongoose.model("Artikel", artikelSchema);

module.exports = Artikel;