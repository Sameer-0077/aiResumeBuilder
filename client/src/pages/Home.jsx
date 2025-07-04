import React from "react";
import { Link } from "react-router-dom";
import Resume_1 from "/assets/Resume-1.jpg";
import { motion } from "framer-motion";
import { container, fadeInUp } from "../Animation";

// Animation variants

function Home() {
  return (
    <div>
      <div className="bg-blue-50 min-h-screen overflow-y-auto">
        <motion.div
          className="pt-24 px-6 sm:pt-48 sm:px-10"
          initial="hidden"
          animate="visible"
          variants={container}
        >
          <motion.h1
            variants={fadeInUp}
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl"
          >
            Craft Professional{" "}
            <span className="text-blue-600">Resumes & Cover Letters</span>{" "}
            Effortlessly with <span className="text-blue-600">AI</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mt-6 text-md sm:text-lg leading-8 text-gray-600"
          >
            Land your dream job with AI-powered resume and cover letter builder.
            Create professional documents in minutes, not hours.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-col sm:flex-row gap-8 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/resume-builder"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Build Resume →
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/cover-letters"
                className="bg-blue-300 text-gray-800 px-6 py-2 rounded hover:bg-blue-400"
              >
                Create Cover Letter
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-16 mb-10 flow-root sm:mt-24"
          >
            <div className="flex justify-center items-center rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl lg:p-4">
              <img
                src={Resume_1}
                alt="Resume builder interface"
                width={400}
                height={800}
                className="rounded-md bg-white shadow-2xl ring-1 ring-gray-900/10"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
      <div className="mt-2 w-full bg-white mb-6 ">
        <h2 className="text-3xl text-gray-900 mt-8 font-bold ">
          Everything you need to land your next <br />
          job
        </h2>
        <p className="text-gray-600 mt-4 text-md sm:text-lg">
          Our AI-powered platform provides all the tools you need to create
          professional <br />
          resumes and cover letters.
        </p>
      </div>
      <motion.div
        className="bg-blue-600 py-20"
        initial="hidden"
        animate="visible"
        variants={container}
      >
        <motion.h1
          className="text-4xl font-bold text-white"
          variants={fadeInUp}
        >
          Ready to build your resume?
        </motion.h1>
        <motion.p className="text-gray-100 pt-4 text-lg" variants={fadeInUp}>
          Start creating your professional resume today and land your dream job
          tomorrow.
        </motion.p>
        <motion.div
          variants={fadeInUp}
          className="mt-10 flex flex-col sm:flex-row gap-8 justify-center items-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/resume-builder"
              className="bg-white text-black px-6 py-2 rounded hover:bg-gray-100"
            >
              Build Resume Now
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/cover-letters"
              className=" text-white px-6 py-2 rounded hover:bg-blue-400"
            >
              Or create cover letter →
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Home;
