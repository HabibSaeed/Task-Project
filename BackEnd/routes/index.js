const express = require("express");

const { signUpController, LoginController } = require("../controller/AuthController");
const authMiddleware = require("../middleware");
const router = express.Router();

router.post("/api/signup", signUpController);
router.post("/api/login", LoginController);

module.exports = router;
