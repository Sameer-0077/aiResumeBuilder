import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="bg-gray-50 py-16 px-6 md:px-20">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
        >
          About <span className="text-blue-600">AI Resume Builder</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto mb-6"
        >
          Developed by{" "}
          <span className="font-semibold text-gray-800">Sameer Yadav</span>, AI
          Resume Builder is a full-stack application that leverages the power of
          Artificial Intelligence to help job seekers create professional,
          ATS-friendly resumes in minutes. The goal was to simplify the resume
          creation process, especially for those unsure about formatting,
          wording, or tailoring their resume for specific roles.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto mb-6"
        >
          The project was built using{" "}
          <span className="font-semibold">React.js</span> and
          <span className="font-semibold"> Tailwind CSS</span> for the frontend,
          <span className="font-semibold"> Node.js</span> and
          <span className="font-semibold"> Express.js</span> for the backend,
          and integrates with AI APIs to generate tailored resume content.
          Features include real-time preview, downloadable PDF output, and the
          ability to generate cover letters — all with a sleek, user-friendly
          interface.
        </motion.p>

        {/* <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto"
        >
          Building this project allowed me to enhance my skills in
          <span className="font-semibold"> API integration</span>,
          <span className="font-semibold"> responsive UI design</span>, and
          <span className="font-semibold">
            {" "}
            full-stack application architecture
          </span>
          , while solving a real-world problem for job seekers.
        </motion.p> */}

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8"
        >
          <Link
            to="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
          >
            Start Building Your Resume
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
