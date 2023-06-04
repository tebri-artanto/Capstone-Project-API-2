const express = require("express");
const router = new express.Router();
const artikelController = require("../Controller/artikelController");
const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);
router.post("/add", artikelController.upload, artikelController.postArtikel);
router.get("/", artikelController.getArtikel)

module.exports = router;