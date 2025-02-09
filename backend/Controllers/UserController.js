const Users = require("../models/Users");

// Get a student by ID
const getUserById = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new student
const createUser = async (req, res) => {
  try {
    const newUser = new Users(req.body);
    const savedUser = await newUser.save();
    res.status(201).json({ data: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Student login
const loginUser = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (user) {
      if (user.password === req.body.password) {
        res.status(200).json({ msg: "ok", data:user});
      } else {
        res.status(400).json({ msg: "Incorrect password" });
      }
    } else {
      res.status(400).json({ msg: "Invalid user" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update student details
const updateUser = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    Object.keys(req.body).forEach((key) => {
      user[key] = req.body[key] || user[key];
    });

    const updatedUser = await user.save();
    res.status(200).json({ data: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete student
const deleteUser = async (req, res) => {
  try {
    const user = await Users.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getUserById,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
};
