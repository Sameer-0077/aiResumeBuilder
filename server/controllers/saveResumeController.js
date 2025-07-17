const mongoose = require("mongoose");
const Resume = require("../models/resume");

const saveResume = async (req, res) => {
  data = req.body;
  const newResume = await Resume.create({
    data,
  });
  return res
    .status(201)
    .json({ status: "Data saved", id: newResume._id, data: newResume.data });
};

module.exports = {
  saveResume,
};
