const express = require("express");
const router = new express.Router();
const pengepulController = require("../Controller/pengepulController");
const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);
router.post("/add", pengepulController.pengepulSignUp);
router.get("/", pengepulController.getPengepul)

module.exports = router;