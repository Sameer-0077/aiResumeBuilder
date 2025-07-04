import React from "react";
import { motion } from "framer-motion";
import { container, fadeInLeft } from "../../Animation";

function StepProjects({ data, setData }) {
  const projects = data.projects?.length
    ? data.projects
    : [
        {
          name: "",
          description: "",
          technologies: [""],
          link: "",
        },
      ];

  const updateProject = (index, field, value) => {
    const updated = [...projects];
    updated[index][field] = value;
    setData({ ...data, projects: updated });
  };

  const updateTechnology = (projIndex, techIndex, value) => {
    const updated = [...projects];
    updated[projIndex].technologies[techIndex] = value;
    setData({ ...data, projects: updated });
  };

  const addProject = () => {
    setData({
      ...data,
      projects: [
        ...projects,
        {
          name: "",
          description: "",
          technologies: [""],
          link: "",
        },
      ],
    });
  };

  const addTechnology = (projIndex) => {
    const updated = [...projects];
    updated[projIndex].technologies.push("");
    setData({ ...data, projects: updated });
  };

  const removeProject = (index) => {
    const updated = [...projects];
    updated.splice(index, 1);
    setData({ projects: updated });
  };
  const removeTechnology = (proIndex, techIndex) => {
    const updated = [...projects];
    const updatedTech = [...updated[proIndex].technologies];
    updatedTech.splice(techIndex, 1);
    updated[proIndex].technologies = updatedTech;
    setData({ projects: updated });
  };

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={fadeInLeft}
    >
      {projects.map((proj, index) => (
        <div key={index} className="space-y-2 border p-4 rounded shadow-sm">
          <input
            type="text"
            placeholder="Project Name"
            value={proj.name}
            onChange={(e) => updateProject(index, "name", e.target.value)}
            className="w-full border p-2 rounded"
          />
          <textarea
            placeholder="Project Description"
            rows={3}
            value={proj.description}
            onChange={(e) =>
              updateProject(index, "description", e.target.value)
            }
            className="w-full border p-2 rounded"
          />
          <div>
            <label className="block font-medium text-md text-left text-gray-700 cursor-pointer">
              Technologies Used:
            </label>
            {proj.technologies.map((tech, techIndex) => (
              <input
                key={techIndex}
                type="text"
                placeholder={`Technology ${techIndex + 1}`}
                value={tech}
                onChange={(e) =>
                  updateTechnology(index, techIndex, e.target.value)
                }
                className="w-full border p-2 rounded mt-1"
              />
            ))}
            {proj.technologies?.length > 1 && (
              <label
                className="block font-medium text-md text-right text-gray-700 cursor-pointer"
                onClick={() =>
                  removeTechnology(index, proj.technologies.length - 1)
                }
              >
                ❌
              </label>
            )}
            <button
              type="button"
              onClick={() => addTechnology(index)}
              className="mt-2 px-3 py-1 text-sm bg-blue-500 text-white rounded"
            >
              + Add Technology
            </button>
          </div>
          <input
            type="text"
            placeholder="Project Link (Optional)"
            value={proj.link}
            onChange={(e) => updateProject(index, "link", e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
      ))}
      {projects?.length > 1 && (
        <label
          className="block font-medium text-md text-right text-gray-700 cursor-pointer"
          onClick={() => removeProject(projects.length - 1)}
        >
          ❌
        </label>
      )}
      <button
        onClick={addProject}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
      >
        + Add Project
      </button>
    </motion.div>
  );
}

export default StepProjects;
