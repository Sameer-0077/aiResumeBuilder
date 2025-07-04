import React from "react";
import { motion } from "framer-motion";
import { container, fadeInLeft } from "../../Animation";

function StepSummary({ data, setData }) {
  const summary = data.summary || "";

  const handleSummaryChange = (e) => {
    setData({
      ...data,
      summary: e.target.value,
    });
  };

  return (
    <motion.div
      className="space-y-2"
      initial="hidden"
      animate="visible"
      variants={fadeInLeft}
    >
      <label className="block text-lg font-medium text-gray-700">
        Professional Summary
      </label>
      <textarea
        rows={5}
        placeholder="Write a brief summary about yourself..."
        value={summary}
        onChange={handleSummaryChange}
        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <p className="text-sm text-gray-500">
        Tip: Highlight your experience, skills, and what makes you stand out.
      </p>
    </motion.div>
  );
}

export default StepSummary;
