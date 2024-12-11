const express = require("express");
const {
  registerUser,
  loginUser,
  roleUpdate,
} = require("../controllers/authController");
const { validateRequest } = require("../middleware/validateRequest");

const router = express.Router();

router.post("/register", validateRequest, registerUser);
router.post("/login", loginUser);
router.put("/role", roleUpdate);

module.exports = router;
