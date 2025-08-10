import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { container, fadeInUp } from "../Animation";

function Footer() {
  return (
    <motion.div
      className="bg-gray-50"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-4">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">
              <span className="text-blue-600">Ai</span>ResumeBuilder
            </h3>
            <p className="text-sm text-gray-700 text-left">
              Create professional resumes and cover letters with the power of
              AI.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-left" mb-4>
              Product
            </h3>
            <ul className="space-y-2 text-start mt-2">
              <li>
                <Link
                  className="text-gray-600 hover:text-gray-700 text-sm"
                  to="/resume-builder"
                >
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 hover:text-gray-700 text-sm"
                  to="/cover-letters"
                >
                  Cover Letter
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 hover:text-gray-700 text-sm"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-left" mb-4>
              Company
            </h3>
            <ul className="space-y-2 text-start mt-2">
              <li>
                <Link
                  className="text-gray-600 hover:text-gray-700 text-sm"
                  to="/about-us"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 hover:text-gray-700 text-sm"
                  to="/"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 hover:text-gray-700 text-sm"
                  to="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-left" mb-4>
              Legal
            </h3>
            <ul className="space-y-2 text-start mt-2">
              <li>
                <Link
                  className="text-gray-600 hover:text-gray-700 text-sm"
                  to="/"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 hover:text-gray-700 text-sm"
                  to="/"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray text-sm">
            © 2025 ResumeAI. All rights reserved.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default Footer;
