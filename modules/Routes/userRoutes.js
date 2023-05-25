const express = require("express");
const router = new express.Router();
const authController = require("../Controller/authController");

router.post("/signup", authController.signUp);
router.post("/login", authController.logIn);

module.exports = router;