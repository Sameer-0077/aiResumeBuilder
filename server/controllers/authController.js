const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const userSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already in use!");
      return res.status(400).json({ error: "Email already in use" });
    }

    await User.create({
      name,
      email,
      password,
    });
    return res.status(201).json({
      status: "Signup Successful!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Server error while creating a new user",
      details: error.message,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User doesn't exist!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invaild Password" });
    }

    generateToken(res, user._id);
    res.status(200).json({
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(400).json({
      error: "Server error",
      details: error.message,
    });
  }
};

const userLogout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Logout failed. Please try again." });
  }
};

const getCurrentUser = async (req, res) => {
  res.status(200).json({ user: req.user });
};

module.exports = {
  userSignUp,
  userLogin,
  userLogout,
  getCurrentUser,
};
