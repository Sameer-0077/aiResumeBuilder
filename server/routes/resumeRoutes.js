const express = require("express");
const router = express.Router();

const { generateResume } = require("../controllers/resumeController");
const { generateCoverLetter } = require("../controllers/coverLetterController");
const {
  saveResume,
  saveCoverLetter,
  getAllResume,
  getAllCoverLetter,
} = require("../controllers/saveResumeController");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.post("/generate-resume", generateResume);
router.post("/generate-cover-letter", generateCoverLetter);
router.post("/save-resume", isAuthenticated, saveResume);
router.post("/save-cover-letter", isAuthenticated, saveCoverLetter);
router.get("/get-resume/:userId", isAuthenticated, getAllResume);
router.get("/get-cover-letter/:userId", isAuthenticated, getAllCoverLetter);

module.exports = router;
