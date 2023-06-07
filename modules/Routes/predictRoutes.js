const express = require("express");
const router = new express.Router();
const predictController = require("../Controller/predictController");
//const requireAuth = require("../middleware/requireAuth");


// router.use(requireAuth);
router.post("/", predictController.upload, predictController.postPredictImage);
// router.get("/", predictController.getPredict)
// router.delete("/:id", predictController.deletePredict);
// router.put("/:id", predictController.updatePredict);

module.exports = router;