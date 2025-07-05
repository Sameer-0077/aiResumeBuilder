import React from "react";
import html2pdf from "html2pdf.js";
import { useLocation } from "react-router-dom";

const DownloadResume = () => {
  const location = useLocation();
  const { resumeData } = location.state || {};

  // const resumeData = {
  //   personal_info: {
  //     name: "Sameer Yadav",
  //     email: "sameer@example.com",
  //     phone: "+91 9876543210",
  //     linkedin: "https://linkedin.com/in/sameer",
  //     portfolio: "https://sameer.dev",
  //     location: "Lucknow, India",
  //   },
  //   summary:
  //     "Highly motivated and detail-oriented professional with a strong foundation in [your field/industry], known for delivering high-quality work under tight deadlines. Demonstrated ability to solve complex problems, collaborate effectively with cross-functional teams, and continuously learn new technologies and tools. Passionate about leveraging skills in [specific skill or domain, e.g., web development/data analysis/project management] to contribute to organizational success. Seeking to bring value and innovation to a dynamic team environment.",
  //   s: [
  //     {
  //       title: "Frontend Developer",
  //       company: "TechZone Pvt Ltd",
  //       location: "Remote",
  //       start_date: "Jan 2023",
  //       end_date: "Present",
  //       responsibilities: [
  //         "Developed responsive UI with React and Tailwind CSS",
  //         "Collaborated with backend team for API integration",
  //         "Implemented performance optimizations that improved load time by 40%",
  //       ],
  //     },
  //   ],
  //   education: [
  //     {
  //       degree: "Bachelor of Science",
  //       major: "Computer Science",
  //       university: "XYZ University",
  //       location: "Lucknow",
  //       start_date: "Jul 2019",
  //       end_date: "Jun 2023",
  //       gpa: "8.5/10",
  //     },
  //   ],
  //   skills: {
  //     technical: ["JavaScript", "React", "Node.js", "MongoDB"],
  //     soft: ["Communication", "Problem Solving", "Teamwork"],
  //     languages: ["English", "Hindi"],
  //   },
  //   projects: [
  //     {
  //       name: "AI Resume Builder",
  //       description: "An app to generate resumes using AI based on user input.",
  //       technologies: ["React", "Tailwind", "Gemini API"],
  //       link: "https://ai-resume.sameer.dev",
  //     },
  //   ],
  //   certifications: [
  //     {
  //       name: "Full Stack Web Development",
  //       issuing_organization: "Coursera",
  //       date: "May 2023",
  //       link: "https://coursera.org/cert/fullstack123",
  //     },
  //   ],
  // };

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

  const downloadAsPDF = () => {
    const element = document.getElementById("resume-content");
    const opt = {
      margin: 0,
      filename: `${personal_info.name}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 4, dpi: 500 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();

    // html2pdf()
    //   .set(opt)
    //   .from(element)
    //   .outputPdf("bloburl") // 💡 This creates a previewable Blob URL
    //   .then((pdfUrl) => {
    //     window.open(pdfUrl, "_blank"); // 🔍 Opens preview in a new tab
    //   });
  };

  return (
    <div className="p-4 font-[Times_New_Roman] text-left">
      <div
        id="resume-content"
        className="bg-white text-black p-10 mx-auto shadow-lg"
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
      <div className="text-center mt-6">
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
