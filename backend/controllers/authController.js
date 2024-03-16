// controllers/authController.js

const User = require("../models/user");

exports.registerUser = async (req, res) => {
  try {
    await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", error: error });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.userEmail });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json({ userId: user._id, email: user.email, userLoggedIn: true });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
