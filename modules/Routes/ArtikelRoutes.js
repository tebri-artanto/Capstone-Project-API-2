const express = require("express");
const router = new express.Router();
const artikelController = require("../Controller/artikelController");

router.post("/add", artikelController.upload, artikelController.postArtikel);

module.exports = router;