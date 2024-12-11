const express = require("express");
const {
  registerUser,
  loginUser,
  allUsers,
  roleUpdateByAdmin,
  updateSingleUser,
} = require("../controllers/authController");
const { validateRequest } = require("../middleware/validateRequest");

const router = express.Router();

router.get("/users", allUsers);
router.post("/register", validateRequest, registerUser);
router.post("/login", loginUser);
router.put("/role", roleUpdateByAdmin);
router.put("/update", updateSingleUser);

module.exports = router;
