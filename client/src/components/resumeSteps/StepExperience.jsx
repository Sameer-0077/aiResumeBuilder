import React from "react";
import { motion } from "framer-motion";
import { container, fadeInLeft } from "../../Animation";

function StepExperience({ data, setData }) {
  const experiences = data.experiences?.length
    ? data.experiences
    : [
        {
          company: "",
          title: "",
          location: "",
          start_date: "",
          end_date: "",
          responsibilities: [""],
        },
      ];

  const updateExperience = (index, field, value) => {
    const updated = [...experiences];
    updated[index][field] = value;
    setData({ experiences: updated });
  };

  const updateResponsibility = (expIndex, resIndex, value) => {
    const updated = [...experiences];
    updated[expIndex].responsibilities[resIndex] = value;
    setData({ experiences: updated });
  };

  const addExperience = () => {
    setData({
      experiences: [
        ...experiences,
        {
          company: "",
          title: "",
          location: "",
          start_date: "",
          end_date: "",
          responsibilities: [""],
        },
      ],
    });
  };

  const removeExperience = (index) => {
    const updated = [...experiences];
    updated.splice(index, 1);
    setData({ experiences: updated });
  };

  const addResponsibility = (expIndex) => {
    const updated = [...experiences];
    updated[expIndex].responsibilities.push("");
    setData({ experiences: updated });
  };

  const removeResponsibility = (expIndex, resIndex) => {
    const updated = [...experiences];
    const updatedResponsibility = [...updated[expIndex].responsibilities];
    updatedResponsibility.splice(resIndex, 1);
    updated[expIndex].responsibilities = updatedResponsibility;
    setData({ experiences: updated });
  };

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={fadeInLeft}
    >
      {experiences.map((exp, index) => (
        <div key={index} className="space-y-2 border p-4 rounded shadow-sm">
          <input
            type="text"
            placeholder="Company Name"
            value={exp.company}
            onChange={(e) => updateExperience(index, "company", e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Job Title"
            value={exp.title}
            onChange={(e) => updateExperience(index, "title", e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Location"
            value={exp.location}
            onChange={(e) =>
              updateExperience(index, "location", e.target.value)
            }
            className="w-full border p-2 rounded"
          />
          <label className="block font-medium text-md text-left text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            placeholder="Start Date"
            value={exp.start_date}
            onChange={(e) =>
              updateExperience(index, "start_date", e.target.value)
            }
            className="w-full border p-2 rounded"
          />
          <label className="block font-medium text-md text-left text-gray-700">
            End Date
          </label>
          <input
            type="date"
            placeholder="End Date"
            value={exp.end_date}
            onChange={(e) =>
              updateExperience(index, "end_date", e.target.value)
            }
            className="w-full border p-2 rounded"
          />

          <div>
            <label className="block font-medium text-md text-left text-gray-700">
              Responsibilities
            </label>
            {exp.responsibilities.map((res, resIndex) => (
              <input
                key={resIndex}
                type="text"
                placeholder={`Responsibility ${resIndex + 1}`}
                value={res}
                onChange={(e) =>
                  updateResponsibility(index, resIndex, e.target.value)
                }
                className="w-full border p-2 rounded mt-1"
              />
            ))}
            {exp.responsibilities?.length > 1 && (
              <label
                className="block font-medium text-md text-right text-gray-700 cursor-pointer"
                onClick={() =>
                  removeResponsibility(index, exp.responsibilities.length - 1)
                }
              >
                ❌
              </label>
            )}
            <button
              type="button"
              onClick={() => addResponsibility(index)}
              className="mt-2 px-3 py-1 text-sm bg-blue-500 text-white rounded"
            >
              + Add Responsibility
            </button>
          </div>
        </div>
      ))}
      {experiences?.length > 1 && (
        <label
          className="block font-medium text-md text-right text-gray-700 cursor-pointer"
          onClick={() => removeExperience(experiences.length - 1)}
        >
          ❌
        </label>
      )}
      <button
        onClick={addExperience}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
      >
        + Add Experience
      </button>
    </motion.div>
  );
}

export default StepExperience;
