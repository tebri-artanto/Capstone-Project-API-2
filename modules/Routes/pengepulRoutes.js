const express = require("express");
const router = new express.Router();
const pengepulController = require("../Controller/pengepulController");
const requireAuth = require("../middleware/requireAuth");

router.get("/", pengepulController.getPengepul);
router.use(requireAuth);
router.post("/add", pengepulController.pengepulSignUp);
router.delete("/:id", pengepulController.deletePengepul);


module.exports = router;