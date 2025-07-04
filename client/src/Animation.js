const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: "easeOut",
    },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: 40 }, // 👈 slide in from the right
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

export { container, fadeInUp, fadeInLeft };

const resumeData = {
  personal_info: {
    name: "Sameer Yadav",
    email: "sameer@example.com",
    phone: "+91 9876543210",
    linkedin: "https://linkedin.com/in/sameer",
    portfolio: "https://sameer.dev",
    location: "Lucknow, India",
  },
  summary:
    "Passionate full-stack developer with expertise in JavaScript, React, and Node.js.",
  experience: [
    {
      title: "Frontend Developer",
      company: "TechZone Pvt Ltd",
      location: "Remote",
      start_date: "Jan 2023",
      end_date: "Present",
      responsibilities: [
        "Developed responsive UI with React and Tailwind CSS",
        "Collaborated with backend team for API integration",
        "Implemented performance optimizations that improved load time by 40%",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Science",
      major: "Computer Science",
      university: "XYZ University",
      location: "Lucknow",
      start_date: "Jul 2019",
      end_date: "Jun 2023",
      gpa: "8.5/10",
    },
  ],
  skills: {
    technical: ["JavaScript", "React", "Node.js", "MongoDB"],
    soft: ["Communication", "Problem Solving", "Teamwork"],
    languages: ["English", "Hindi"],
  },
  projects: [
    {
      name: "AI Resume Builder",
      description: "An app to generate resumes using AI based on user input.",
      technologies: ["React", "Tailwind", "Gemini API"],
      link: "https://ai-resume.sameer.dev",
    },
  ],
  certifications: [
    {
      name: "Full Stack Web Development",
      issuing_organization: "Coursera",
      date: "May 2023",
      link: "https://coursera.org/cert/fullstack123",
    },
  ],
};
