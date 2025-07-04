import React from "react";

import { motion } from "framer-motion";
import { container, fadeInLeft } from "../../Animation";

function StepEducation({ data, setData }) {
  const education = data.education || [
    {
      degree: "",
      major: "",
      university: "",
      location: "",
      start_year: "",
      end_year: "",
      gpa: "",
    },
  ];

  const updateEducation = (index, field, value) => {
    const updated = [...education];
    updated[index][field] = value;
    setData({ ...data, education: updated });
  };

  const addEducation = () => {
    setData({
      ...data,
      education: [
        ...education,
        {
          degree: "",
          major: "",
          university: "",
          location: "",
          start_year: "",
          end_year: "",
          gpa: "",
        },
      ],
    });
  };

  const removeEducation = (index) => {
    const updated = [...education];
    updated.splice(index, 1);
    setData({ education: updated });
  };

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 50 }, (_, i) => currentYear - i);

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={fadeInLeft}
    >
      {education.map((edu, index) => (
        <div
          key={index}
          className="space-y-3 border p-4 rounded shadow-sm relative"
        >
          <input
            type="text"
            placeholder="Degree"
            value={edu.degree}
            onChange={(e) => updateEducation(index, "degree", e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Major"
            value={edu.major}
            onChange={(e) => updateEducation(index, "major", e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            placeholder="University"
            value={edu.university}
            onChange={(e) =>
              updateEducation(index, "university", e.target.value)
            }
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Location"
            value={edu.location}
            onChange={(e) => updateEducation(index, "location", e.target.value)}
            className="w-full border p-2 rounded"
          />

          <div className="flex gap-4">
            <select
              value={edu.start_year}
              onChange={(e) =>
                updateEducation(index, "start_year", e.target.value)
              }
              className="w-full border p-2 rounded"
            >
              <option value="">Start Year</option>
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <select
              value={edu.end_year}
              onChange={(e) =>
                updateEducation(index, "end_year", e.target.value)
              }
              className="w-full border p-2 rounded"
            >
              <option value="">End Year</option>
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
              <option value="Present">Present</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="GPA (optional)"
            value={edu.gpa}
            onChange={(e) => updateEducation(index, "gpa", e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
      ))}
      {education?.length > 1 && (
        <label
          className="block font-medium text-md text-right text-gray-700 cursor-pointer"
          onClick={() => removeEducation(education.length - 1)}
        >
          ❌
        </label>
      )}

      <button
        onClick={addEducation}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
      >
        + Add Education
      </button>
    </motion.div>
  );
}
export default StepEducation;
