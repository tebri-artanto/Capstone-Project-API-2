const express = require("express");
const router = new express.Router();
const pengepulController = require("../Controller/pengepulController");
const requireAuth = require("../middleware/requireAuth");

router.get("/", pengepulController.getPengepul);
router.use(requireAuth);
router.post("/add", pengepulController.pengepulSignUp);
router.get("/:username", pengepulController.getPengepulByUsername);
router.delete("/delete", pengepulController.deletePengepul);
router.put("/update", pengepulController.updatePengepul);

module.exports = router;