const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Create User
// exports.createUser = async (req, res) => {
//   try {
//     const { name, email, password, address, phone } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.status(400).json({ error: "Email already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({
//       name,
//       email,
//       password: hashedPassword,
//       address,
//       phone,
//     });
//     await user.save();

//     const userResponse = user.toObject();
//     delete userResponse.password;
//     res.status(201).json(userResponse);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get User by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const updateData = { name, email, address, phone };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    }).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
