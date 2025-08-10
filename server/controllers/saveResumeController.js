const mongoose = require("mongoose");
const Resume = require("../models/resumeModel");
const Cover = require("../models/coverLatterModel");

const saveResume = async (req, res) => {
  try {
    data = req.body;
    if (!data) throw new Error("No data receive");
    await Resume.create({
      data,
      userId: req.user._id,
    });
    return res.status(201).json({ status: "Resume saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const saveCoverLetter = async (req, res) => {
  try {
    data = req.body;
    if (!data) throw new Error("No data receive");
    await Cover.create({
      data,
      userId: req.user._id,
    });
    return res.status(201).json({ status: "Cover Letter saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllResume = async (req, res) => {
  try {
    const user = req.params.userId;
    if (!user) throw new Error("UserID not found");
    const allResume = await Resume.find({ userId: user })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(allResume);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllCoverLetter = async (req, res) => {
  try {
    const user = req.params.userId;
    if (!user) throw new Error("UserID not found");
    const allCoverLetter = await Cover.find({ userId: user })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(allCoverLetter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  saveResume,
  saveCoverLetter,
  getAllResume,
  getAllCoverLetter,
};
