const Users = require("../models/Users");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Folder = require("../models/Folders");
const Playground = require("../models/Playgrounds");

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await Users.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Users({ name, email, password: hashedPassword }); 
    // const newUser = new Users({ name, email});
    const savedUser = await newUser.save();
    res.status(201).json({ data: savedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get a student by ID
const getUserById = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await Users.findById(userId).select("-password"); // 👈 exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


const loginUser = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ msg: "Invalid user" });

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Details" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET , { expiresIn: '1d' });

    res.status(200).json({
      msg: "ok",
      token,
      user: { name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



const updateUser = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if password is being updated, hash it
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    // Update fields
    Object.keys(req.body).forEach((key) => {
      user[key] = req.body[key] || user[key];
    });

    await user.save();

    // Refetch without password
    const updatedUser = await Users.findById(req.params.id).select("-password");

    res.status(200).json({ data: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete student
// const deleteUser = async (req, res) => {
//   try {
//     const user = await Users.findByIdAndDelete(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.status(200).json({ message: "User deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };



const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Step 1: Delete all playgrounds directly created by the user
    await Playground.deleteMany({ userId });

    // Step 2: Delete all folders created by the user
    await Folder.deleteMany({ userId });

    // step 3: Delete user
    const user = await Users.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User and all related folders/playgrounds deleted successfully" });

  } catch (error) {
    console.error("Error deleting user:", error);
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
