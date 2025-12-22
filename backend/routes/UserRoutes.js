const express = require("express");
const {
  getUserById,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
} = require("../Controllers/UserController");
const verifyToken = require("../middleware/auth");

const router = express.Router();

// Public
router.post("/addUsers", createUser); // Signup
router.post("/Login", loginUser);     // Login

// Protected
router.get("/", verifyToken, getUserById);

router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

module.exports = router;
