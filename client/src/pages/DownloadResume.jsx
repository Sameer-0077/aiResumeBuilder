import React, { useEffect } from "react";
import html2pdf from "html2pdf.js";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import useUserStore from "../store/userStore";

const DownloadResume = () => {
  const location = useLocation();
  const { resumeData, newResume } = location.state || {};
  const [showResume, setShowResume] = useState(false);
  const user = useUserStore((state) => state.user);

  // console.log(location.state);

  if (!resumeData) return <p>No resume data available.</p>;

  const {
    personal_info,
    summary,
    experiences,
    education,
    skills,
    projects,
    certifications,
  } = resumeData;

  const previewAsPDF = () => {
    setShowResume(true);
    const element = document.getElementById("resume-content");
    const opt = {
      margin: 0,
      filename: `${personal_info.name}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 4, dpi: 500 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    setTimeout(() => {
      html2pdf()
        .set(opt)
        .from(element)
        .outputPdf("bloburl")
        .then((pdfUrl) => {
          window.open(pdfUrl, "_blank"); // 3. Preview PDF in new tab
          setShowResume(false); // 4. Hide the resume after preview
        });
    }, 50);
  };

  const downloadAsPDF = () => {
    setShowResume(true);
    const element = document.getElementById("resume-content");
    const opt = {
      margin: 0,
      filename: `${personal_info.name}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 4, dpi: 500 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    setTimeout(() => {
      html2pdf().set(opt).from(element).save();
      setShowResume(false);
    }, 50);
    // setShowResume(true);
  };

  const saveResume = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_API_SAVE_RESUME_URI, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resumeData),
      });

      const result = await res.json();
      if (!res.ok) {
        return console.log("Error: resume doesn't saved", result.error);
      }

      return console.log(result.status);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };
  useEffect(() => {
    // console.log(
    //   "useEffect called. newResume:",
    //   newResume,
    //   "resumeSaved:",
    //   sessionStorage.getItem("resumeSaved")
    // );
    if (newResume && !sessionStorage.getItem("resumeSaved") && user) {
      saveResume();
      sessionStorage.setItem("resumeSaved", "true");
    }
  }, [newResume]);

  return (
    <div className="p-4 font-[Times_New_Roman] text-left">
      <div
        className="bg-white text-black shadow-lg mx-auto p-4 sm:p-6 md:p-10"
        style={{
          fontFamily: '"Times New Roman", Times, serif',
          maxWidth: "800px",
          width: "100%",
          textAlign: "left",
          overflow: "hidden",
          pageBreakInside: "avoid",
        }}
      >
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold uppercase">
            {personal_info.name}
          </h1>
          <p className="text-sm mt-1 break-words">
            {personal_info.location} • {personal_info.phone} •{" "}
            {personal_info.email}
          </p>
          <p className="text-sm break-words">
            {personal_info.linkedin && (
              <a href={personal_info.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            )}
            {personal_info.portfolio && (
              <>
                {"  "} |{" "}
                <a
                  href={personal_info.portfolio}
                  target="_blank"
                  rel="noreferrer"
                >
                  Portfolio
                </a>
              </>
            )}
          </p>
        </div>

        <hr className="my-4 border-t-2 border-gray-400" />

        {/* Summary */}
        {summary && (
          <>
            <h2 className="text-base sm:text-lg font-bold mb-1">SUMMARY</h2>
            <p className="mb-4 text-sm leading-relaxed text-justify">
              {summary}
            </p>
          </>
        )}

        {/* Experience */}
        {experiences?.length > 0 && (
          <>
            <h2 className="text-base sm:text-lg font-bold mb-1">
              WORK EXPERIENCE
            </h2>
            <div className="mb-4">
              {experiences.map((exp, i) => (
                <div key={i} className="mb-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between font-bold text-sm">
                    <span>
                      {exp.title}, {exp.company}
                    </span>
                    <span>
                      {exp.start_date} - {exp.end_date}
                    </span>
                  </div>
                  <p className="text-xs italic text-gray-700">{exp.location}</p>
                  <ul className="list-disc ml-5 text-sm mt-1 space-y-1">
                    {exp.responsibilities?.map((r, j) => (
                      <li key={j} className="text-justify">
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Education */}
        {education?.length > 0 && (
          <>
            <h2 className="text-base sm:text-lg font-bold mb-1">EDUCATION</h2>
            <div className="mb-4">
              {education.map((edu, i) => (
                <div key={i} className="mb-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between font-bold text-sm">
                    <span>
                      {edu.degree} in {edu.major}
                    </span>
                    <span>
                      {edu.start_date} - {edu.end_date}
                    </span>
                  </div>
                  <p className="text-xs italic text-gray-700">
                    {edu.university}, {edu.location}
                  </p>
                  {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Skills */}
        {skills && (
          <>
            <h2 className="text-base sm:text-lg font-bold mb-1">
              ADDITIONAL INFORMATION
            </h2>
            <ul className="text-sm list-disc ml-5 mb-4 space-y-1">
              {skills.technical?.length > 0 && (
                <li>
                  <strong>Technical Skills:</strong>{" "}
                  {skills.technical.join(", ")}
                </li>
              )}
              {skills.soft?.length > 0 && (
                <li>
                  <strong>Soft Skills:</strong> {skills.soft.join(", ")}
                </li>
              )}
              {skills.languages?.length > 0 && (
                <li>
                  <strong>Languages:</strong> {skills.languages.join(", ")}
                </li>
              )}
            </ul>
          </>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <>
            <h2 className="text-base sm:text-lg font-bold mb-1">PROJECTS</h2>
            <div className="mb-4">
              {projects.map((proj, i) => (
                <div key={i} className="mb-2">
                  <p className="font-bold text-sm">{proj.name}</p>
                  <p className="text-sm">{proj.description}</p>
                  <p className="text-sm">
                    <strong>Technologies:</strong>{" "}
                    {proj.technologies?.join(", ")}
                  </p>
                  {proj.link && (
                    <a
                      href={proj.link}
                      className="text-blue-600 text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project
                    </a>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Certifications */}
        {certifications?.length > 0 && (
          <>
            <h2 className="text-base sm:text-lg font-bold mb-1">
              CERTIFICATIONS
            </h2>
            <div className="mb-4">
              {certifications.map((cert, i) => (
                <div key={i} className="mb-2">
                  <p className="font-bold text-sm">{cert.name}</p>
                  <p className="text-sm">
                    {cert.issuing_organization} | {cert.date}
                  </p>
                  {cert.link && (
                    <a
                      href={cert.link}
                      className="text-blue-600 text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Certificate
                    </a>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div
        id="resume-content"
        className={`bg-white text-black p-10 mx-auto shadow-lg ${
          showResume ? "" : "hidden"
        }`}
        style={{
          fontFamily: '"Times New Roman", Times, serif',
          maxWidth: "800px",
          width: "210mm",
          // minHeight: "297mm",
          textAlign: "left",
          overflow: "hidden", // prevents layout spillover
          pageBreakInside: "avoid",
        }}
      >
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold uppercase">{personal_info.name}</h1>
          <p className="text-sm mt-1">
            {personal_info.location} • {personal_info.phone} • {"  "}
            {personal_info.email}
          </p>
          <p className="text-sm">
            {personal_info.linkedin && (
              <a href={personal_info.linkedin} target="_blank" rel="noreferrer">
                Linkedin
              </a>
            )}
            {personal_info.portfolio && (
              <>
                {"  "}|{"  "}
                <a
                  href={personal_info.portfolio}
                  target="_blank"
                  rel="noreferrer"
                >
                  Portfolio
                </a>
              </>
            )}
          </p>
        </div>

        <hr className="my-4 border-t-2 border-gray-400" />

        {/* Summary */}
        {summary && (
          <>
            <h2 className="text-lg font-bold mb-1">SUMMARY</h2>
            <p className="mb-4 text-sm leading-relaxed text-justify">
              {summary}
            </p>
          </>
        )}

        {/* Experience */}
        {experiences?.length > 0 && (
          <>
            <h2 className="text-lg font-bold mb-1">WORK EXPERIENCE</h2>
            <div className="mb-4">
              {experiences.map((exp, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between font-bold text-sm">
                    <span>
                      {exp.title}, {exp.company}
                    </span>
                    <span>
                      {exp.start_date} - {exp.end_date}
                    </span>
                  </div>
                  <p className="text-xs italic text-gray-700">{exp.location}</p>
                  <ul className="list-disc ml-5 text-sm mt-1">
                    {exp.responsibilities?.map((r, j) => (
                      <li key={j} className="text-justify">
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Education */}
        {education?.length > 0 && (
          <>
            <h2 className="text-lg font-bold mb-1">EDUCATION</h2>
            <div className="mb-4">
              {education.map((edu, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between font-bold text-sm">
                    <span>
                      {edu.degree} in {edu.major}
                    </span>
                    <span>
                      {edu.start_date} - {edu.end_date}
                    </span>
                  </div>
                  <p className="text-xs italic text-gray-700">
                    {edu.university}, {edu.location}
                  </p>
                  {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Skills */}
        {skills && (
          <>
            <h2 className="text-lg font-bold mb-1">ADDITIONAL INFORMATION</h2>
            <ul className="text-sm list-disc ml-5 mb-4">
              {skills.technical?.length > 0 && (
                <li>
                  <strong>Technical Skills:</strong>{" "}
                  {skills.technical.join(", ")}
                </li>
              )}
              {skills.soft?.length > 0 && (
                <li>
                  <strong>Soft Skills:</strong> {skills.soft.join(", ")}
                </li>
              )}
              {skills.languages?.length > 0 && (
                <li>
                  <strong>Languages:</strong> {skills.languages.join(", ")}
                </li>
              )}
            </ul>
          </>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <>
            <h2 className="text-lg font-bold mb-1">PROJECTS</h2>
            <div className="mb-4">
              {projects.map((proj, i) => (
                <div key={i} className="mb-2">
                  <p className="font-bold text-sm">{proj.name}</p>
                  <p className="text-sm">{proj.description}</p>
                  <p className="text-sm">
                    <strong>Technologies:</strong>{" "}
                    {proj.technologies?.join(", ")}
                  </p>
                  {proj.link && (
                    <a
                      href={proj.link}
                      className="text-blue-600 text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project
                    </a>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Certifications */}
        {certifications?.length > 0 && (
          <>
            <h2 className="text-lg font-bold mb-1">CERTIFICATIONS</h2>
            <div className="mb-4">
              {certifications.map((cert, i) => (
                <div key={i} className="mb-2">
                  <p className="font-bold text-sm">{cert.name}</p>
                  <p className="text-sm">
                    {cert.issuing_organization} | {cert.date}
                  </p>
                  {cert.link && (
                    <a
                      href={cert.link}
                      className="text-blue-600 text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Certificate
                    </a>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Download Button */}
      <div className="flex justify-center items-center mt-6 gap-8">
        <button
          onClick={previewAsPDF}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Full Preview
        </button>
        <button
          onClick={downloadAsPDF}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default DownloadResume;
