import React from "react";
import { motion } from "framer-motion";
import { container, fadeInLeft } from "../../Animation";

function StepSkills({ data, setData }) {
  const skills = data.skills || {
    technical: [""],
    soft: [""],
    languages: [""],
  };

  const updateSkill = (type, index, value) => {
    const updatedSkills = { ...skills };
    updatedSkills[type][index] = value;
    setData({ ...data, skills: updatedSkills });
  };

  const addSkill = (type) => {
    const updatedSkills = { ...skills };
    updatedSkills[type].push("");
    setData({ ...data, skills: updatedSkills });
  };

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={fadeInLeft}
    >
      {/* Technical Skills */}
      <div>
        <label className="block font-medium text-lg text-gray-700">
          Technical Skills
        </label>
        {skills.technical.map((skill, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Technical Skill ${index + 1}`}
            value={skill}
            onChange={(e) => updateSkill("technical", index, e.target.value)}
            className="w-full mt-1 mb-2 border p-2 rounded"
          />
        ))}
        <button
          type="button"
          onClick={() => addSkill("technical")}
          className="text-sm px-3 py-1 bg-blue-500 text-white rounded"
        >
          + Add Technical Skill
        </button>
      </div>

      {/* Soft Skills */}
      <div>
        <label className="block font-medium text-lg text-gray-700">
          Soft Skills
        </label>
        {skills.soft.map((skill, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Soft Skill ${index + 1}`}
            value={skill}
            onChange={(e) => updateSkill("soft", index, e.target.value)}
            className="w-full mt-1 mb-2 border p-2 rounded"
          />
        ))}
        <button
          type="button"
          onClick={() => addSkill("soft")}
          className="text-sm px-3 py-1 bg-blue-500 text-white rounded"
        >
          + Add Soft Skill
        </button>
      </div>

      {/* Languages */}
      <div>
        <label className="block font-medium text-lg text-gray-700">
          Languages
        </label>
        {skills.languages.map((lang, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Language ${index + 1}`}
            value={lang}
            onChange={(e) => updateSkill("languages", index, e.target.value)}
            className="w-full mt-1 mb-2 border p-2 rounded"
          />
        ))}
        <button
          type="button"
          onClick={() => addSkill("languages")}
          className="text-sm px-3 py-1 bg-blue-500 text-white rounded"
        >
          + Add Language
        </button>
      </div>
    </motion.div>
  );
}

export default StepSkills;
