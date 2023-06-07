const express = require("express");
const router = new express.Router();
const predictController = require("../Controller/predictController");
//const requireAuth = require("../middleware/requireAuth");


// router.use(requireAuth);
router.post("/", predictController.upload, predictController.postPredictImage);
module.exports = router;