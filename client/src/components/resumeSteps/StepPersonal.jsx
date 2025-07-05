import React from "react";
import { motion } from "framer-motion";
import { container, fadeInLeft } from "../../Animation";

function StepPersonal({ data, setData }) {
  const personalInfo = data.personal_info || {
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    portfolio: "",
    location: "",
  };

  const updateField = (field, value) => {
    setData({
      ...data,
      personal_info: {
        ...personalInfo,
        [field]: value,
      },
    });
  };

  return (
    <motion.div
      className="space-y-4"
      initial="hidden"
      animate="visible"
      variants={fadeInLeft}
    >
      <input
        id="full-name"
        type="text"
        placeholder="Full Name"
        value={personalInfo.name}
        onChange={(e) => updateField("name", e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        id="email"
        type="email"
        placeholder="Email Address"
        value={personalInfo.email}
        onChange={(e) => updateField("email", e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        id="phone-number"
        type="tel"
        placeholder="Phone Number"
        value={personalInfo.phone}
        onChange={(e) => updateField("phone", e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        id="linkedin"
        type="url"
        placeholder="LinkedIn Profile URL"
        value={personalInfo.linkedin}
        onChange={(e) => updateField("linkedin", e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        id="portfolio"
        type="url"
        placeholder="Portfolio / Personal Website"
        value={personalInfo.portfolio}
        onChange={(e) => updateField("portfolio", e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        id="location"
        type="text"
        placeholder="Location (e.g., City, Country)"
        value={personalInfo.location}
        onChange={(e) => updateField("location", e.target.value)}
        className="w-full border p-2 rounded"
      />
    </motion.div>
  );
}

export default StepPersonal;
