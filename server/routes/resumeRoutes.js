const express = require("express");
const router = express.Router();

// Import controllers using require
const { generateResume } = require("../controllers/resumeController");
const { generateCoverLetter } = require("../controllers/coverLetterController");
const { userSignUp, userLogin } = require("../controllers/authController");
const validateNewUser = require("../middlewares/validateNewUser");
const validateAuthUser = require("../middlewares/validateAuthUser");
const { saveResume } = require("../controllers/saveResumeController");
// Routes
router.post("/generate-resume", generateResume);
router.post("/generate-cover-letter", generateCoverLetter);
router.post("/signup", validateNewUser, userSignUp);
router.post("/login", validateAuthUser, userLogin);
router.post("/resume", saveResume);
module.exports = router;
