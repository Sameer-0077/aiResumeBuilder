const express = require("express");
const router = express.Router();

// Import controllers using require
const { generateResume } = require("../controllers/resumeController");
const { generateCoverLetter } = require("../controllers/coverLetterController");
const { createNewUser } = require("../controllers/user");
// Routes
router.post("/generate-resume", generateResume);
router.post("/generate-cover-letter", generateCoverLetter);
router.post("/signup", createNewUser);
module.exports = router;
