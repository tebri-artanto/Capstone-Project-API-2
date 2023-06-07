const express = require("express");
const router = new express.Router();
const artikelController = require("../Controller/artikelController");
const requireAuth = require("../middleware/requireAuth");

router.get("/", artikelController.getArtikel)
router.use(requireAuth);
router.post("/add", artikelController.upload, artikelController.postArtikel);
router.delete("/:id", artikelController.deleteArtikel);
router.put("/:id", artikelController.updateArtikel);

module.exports = router;
