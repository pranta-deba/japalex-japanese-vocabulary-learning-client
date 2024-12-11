const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { validateRequest } = require("../middleware/validateRequest");

const router = express.Router();

router.post("/register", validateRequest, registerUser);
router.post("/login", loginUser);

module.exports = router;
