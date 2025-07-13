const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;
// console.log(SALT_ROUNDS);

const createNewUser = async (req, res) => {
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
      status: "New user created Successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Server error while creating a new user",
      details: error.message,
    });
  }
};

module.exports = {
  createNewUser,
};
