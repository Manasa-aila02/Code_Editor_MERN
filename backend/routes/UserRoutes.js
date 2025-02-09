const express = require("express");
const {
  getUserById,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
} = require("../Controllers/UserController");
// const { createUser } = require("../Controllers/UserController");

const router = express.Router();
router.get("/:id", getUserById);
router.post("/addUsers", createUser);
router.post("/Login", loginUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;