import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function ResumeCard({ userData }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/download/resume", {
      state: { resumeData: userData, newResume: false },
    });
  };
  const { personal_info, summary, experiences, education, projects } = userData;
  return (
    <motion.div
      className="bg-white p-3 rounded-lg shadow-md max-w-xs font-[Times_New_Roman] min-h-[350px] text-left cursor-pointer hover:bg-blue-100"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      onClick={handleClick}
    >
      {/* Header */}
      <div className="text-center mb-2">
        <h1 className="text-lg font-bold uppercase">{personal_info.name}</h1>
        <p className="text-[11px]">
          {personal_info.location} • {personal_info.phone}
        </p>
        <p className="text-[11px]">{personal_info.email}</p>
      </div>

      {/* Summary */}
      {summary && (
        <>
          <h2 className="text-xs font-bold mb-0.5">Summary</h2>
          <p className="text-[11px] mb-2 leading-snug">{summary}</p>
        </>
      )}

      {/* Experience */}
      {experiences?.length > 0 && (
        <>
          <h2 className="text-xs font-bold mb-0.5">Experience</h2>
          {experiences.slice(0, 1).map((exp, i) => (
            <div key={i} className="mb-1">
              <p className="text-[11px] font-semibold">
                {exp.title}, {exp.company}
              </p>
              <p className="text-[10px] italic text-gray-600">
                {exp.start_date} - {exp.end_date} • {exp.location}
              </p>
            </div>
          ))}
        </>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <>
          <h2 className="text-xs font-bold mb-0.5 mt-1">Education</h2>
          {education.slice(0, 1).map((edu, i) => (
            <div key={i} className="mb-1">
              <p className="text-[11px] font-semibold">
                {edu.degree} in {edu.major}
              </p>
              <p className="text-[10px] italic text-gray-600">
                {edu.university}
              </p>
            </div>
          ))}
        </>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <>
          <h2 className="text-xs font-bold mb-0.5 mt-1">Projects</h2>
          {projects.slice(0, 1).map((proj, i) => (
            <div key={i}>
              <p className="text-[11px] font-semibold">{proj.name}</p>
              <p className="text-[10px]">{proj.description}</p>
            </div>
          ))}
        </>
      )}
    </motion.div>
  );
}

export default ResumeCard;
