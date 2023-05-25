const express = require("express");
const router = new express.Router();
const pengepulController = require("../Controller/pengepulController");

router.post("/add", pengepulController.pengepulSignUp);
router.get("/", pengepulController.getPengepul)

module.exports = router;