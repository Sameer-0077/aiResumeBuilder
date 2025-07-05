const express = require("express");
const router = express.Router();

// Import controllers using require
const { generateResume } = require("../controllers/resumeController");
const { generateCoverLetter } = require("../controllers/coverLetterController");

// Routes
router.post("/generate-resume", generateResume);
router.post("/generate-cover-letter", generateCoverLetter);
module.exports = router;
