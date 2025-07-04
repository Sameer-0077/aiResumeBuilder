const express = require("express");
const router = express.Router();

// Import controllers using require
const { generateResume } = require("../controllers/resumeController");

// Routes
router.post("/generate-resume", generateResume);
module.exports = router;
