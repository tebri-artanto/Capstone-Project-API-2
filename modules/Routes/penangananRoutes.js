const express = require("express");
const router = new express.Router();
const penanganan = require("../Controller/penangananController");

// router.get("/", penanganan.getPenanganan)
router.post("/add", penanganan.postPenanganan);

module.exports = router;