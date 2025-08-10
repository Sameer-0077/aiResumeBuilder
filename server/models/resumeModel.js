const mongoose = require("mongoose");

const resumeSchema = mongoose.Schema(
  {
    data: Object,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Resume = mongoose.model("resume", resumeSchema);

module.exports = Resume;
/*
const resumeSchema = mongoose.Schema({
  personalInfo: {
    name: String,
    email: String,
    phone: String,
    linkedin: String,
    portfolio: String,
    location: String,
  },
  summary: String,
  experiences: [
    {
      title: String,
      company: String,
      location: String,
      start_date: String,
      responsibilities: Array,
    },
  ],
  education: [
    {
      degree: String,
      major: String,
      university: String,
      location: String,
      start_year: String,
      end_year: String,
      gpa: String,
    },
  ],
  skills: {
    technical: Array,
    soft: Array,
    languages: Array,
  },
  projects: [
    {
      name: String,
      description: String,
      technologies: Array,
      link: String,
    },
  ],
  certifications: [
    {
      name: String,
      issuing_organization: String,
      date: String,
      link: String,
    },
  ],
});
*/
