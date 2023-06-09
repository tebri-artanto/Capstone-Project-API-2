const express = require('express');
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./modules/Routes/userRoutes');
const pengepulRoutes = require('./modules/Routes/pengepulRoutes');
const artikelRoutes = require('./modules/Routes/artikelRoutes');
const predictRoutes = require("./modules/Routes/predictRoutes");

const app = express();

dotenv.config();
require("./modules/Database/mongodb");

// Enable CORS
app.use(cors());

// Parse JSON bodies for this app
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/', userRoutes);
app.use('/pengepul', pengepulRoutes);
app.use('/artikel', artikelRoutes);
app.use('/predictImage', predictRoutes);

// Start the server
app.get("/", (req, res) => {
    console.log("Response success")
    res.send("Response Success!!!")
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log("Server is up and listening on " + PORT)
})
