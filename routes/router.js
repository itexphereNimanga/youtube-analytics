const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userControllers");

// User Registration
router.post("/register", userController.register);

// User Login
router.post("/login", userController.login);

module.exports = router;
