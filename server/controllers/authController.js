const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;
// console.log(SALT_ROUNDS);

const userSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already in use!");
      res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    await User.create({
      name,
      email,
      password: hashedPassword,
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

    res.status(200).json({
      message: "Login succesful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).json({
      error: "Server error",
      details: error.message,
    });
  }
};

module.exports = {
  userSignUp,
  userLogin,
};
