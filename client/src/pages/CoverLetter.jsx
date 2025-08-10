import React from "react";
import { useState } from "react";
import html2pdf from "html2pdf.js";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInUp, container } from "../Animation";
import LoadingScreen from "../components/LoadingScreen";
function CoverLetter() {
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    companyAddress: "",
    hiringManager: "",
    jobDescription: "",
    yourName: "",
    yourEmail: "",
    yourAddress: "",
    yourPhoneNumber: "",
    yourExperience: "",
    whyInterested: "",
    keySkills: "",
    keyAchievements: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const downloadAsPDF = () => {
    const element = document.getElementById("cv-content");
    const opt = {
      margin: 0,
      filename: `${formData.yourName}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2, dpi: 300 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  const previewAsPDF = () => {
    const element = document.getElementById("cv-content");
    const opt = {
      margin: 0,
      filename: `${formData.yourName}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2, dpi: 300 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    // html2pdf().set(opt).from(element).save();

    html2pdf()
      .set(opt)
      .from(element)
      .outputPdf("bloburl") // 💡 This creates a previewable Blob URL
      .then((pdfUrl) => {
        window.open(pdfUrl, "_blank"); // 🔍 Opens preview in a new tab
      });
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const navigate = useNavigate();

  const handleGenerateWithAI = async () => {
    if (!formData || Object.keys(formData).length === 0)
      return alert("Error: User details are required!");
    setIsLoading(true);

    try {
      const res = await fetch(
        "http://localhost:8000/api/resume/generate-cover-letter",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) return alert(data.error);

      console.log("Generated Cover Letter --------");
      console.log(data);

      sessionStorage.removeItem("coverLetterSaved");
      navigate("/download/cover-letter", {
        state: { coverLetterData: data, newCover: true },
      });
    } catch (error) {
      console.log("Getting some error: ", error.message);
      alert("Serever erorr: Failed to fetch");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="min-h-screen bg-gray-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Cover Letter Builder
            </h1>
            <p className="text-gray-600">
              Create a compelling cover letter tailored to your target job
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="space-y-6">
              <div className="bg-white border rounded-lg shadow-sm">
                <div className="border-b p-4">
                  <h2 className="text-lg font-semibold flex items-center">
                    Job Information
                  </h2>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="jobTitle"
                    >
                      Job Title
                    </label>
                    <input
                      id="jobTitle"
                      className="mt-1 w-full border rounded p-2"
                      placeholder="Software Engineer"
                      value={formData.jobTitle}
                      onChange={(e) =>
                        handleInputChange("jobTitle", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="companyName"
                    >
                      Company Name
                    </label>
                    <input
                      id="companyName"
                      className="mt-1 w-full border rounded p-2"
                      placeholder="Tech Company Inc."
                      value={formData.companyName}
                      onChange={(e) =>
                        handleInputChange("companyName", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="companyAddress"
                    >
                      Company Address
                    </label>
                    <input
                      id="companyAddress"
                      className="mt-1 w-full border rounded p-2"
                      placeholder="Tech Company Inc."
                      value={formData.companyAddress}
                      onChange={(e) =>
                        handleInputChange("companyAddress", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="hiringManager"
                    >
                      Hiring Manager (Optional)
                    </label>
                    <input
                      id="hiringManager"
                      className="mt-1 w-full border rounded p-2"
                      placeholder="Jane Smith"
                      value={formData.hiringManager}
                      onChange={(e) =>
                        handleInputChange("hiringManager", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="jobDescription"
                    >
                      Job Description
                    </label>
                    <textarea
                      id="jobDescription"
                      className="mt-1 w-full border rounded p-2 min-h-32"
                      placeholder="Paste the job description here to get AI-powered suggestions..."
                      value={formData.jobDescription}
                      onChange={(e) =>
                        handleInputChange("jobDescription", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded-lg shadow-sm">
                <div className="border-b p-4">
                  <h2 className="text-lg font-semibold">Your Information</h2>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="yourName"
                    >
                      Your Name
                    </label>
                    <input
                      id="yourName"
                      className="mt-1 w-full border rounded p-2"
                      placeholder="John Doe"
                      value={formData.yourName}
                      onChange={(e) =>
                        handleInputChange("yourName", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="yourEmail"
                    >
                      Your Email
                    </label>
                    <input
                      id="yourEmail"
                      className="mt-1 w-full border rounded p-2"
                      placeholder="jhon.dev@gmail.com"
                      value={formData.yourEmail}
                      onChange={(e) =>
                        handleInputChange("yourEmail", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="yourPhone"
                    >
                      Your Phone
                    </label>
                    <input
                      id="yourPhoneNumber"
                      className="mt-1 w-full border rounded p-2"
                      placeholder="+1 0123 456"
                      value={formData.yourPhoneNumber}
                      onChange={(e) =>
                        handleInputChange("yourPhoneNumber", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="yourAddress"
                    >
                      Your Address
                    </label>
                    <input
                      id="yourAddress"
                      className="mt-1 w-full border rounded p-2"
                      placeholder="XYZ city, USA"
                      value={formData.yourAddress}
                      onChange={(e) =>
                        handleInputChange("yourAddress", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="keySkills"
                    >
                      Key Skills
                    </label>
                    <textarea
                      id="keySkills"
                      className="mt-1 w-full border rounded p-2 min-h-20"
                      placeholder="List your key skills relevant to this position..."
                      value={formData.keySkills}
                      onChange={(e) =>
                        handleInputChange("keySkills", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="keySkills"
                    >
                      Key Achievements
                    </label>
                    <textarea
                      id="keyAchievements"
                      className="mt-1 w-full border rounded p-2 min-h-20"
                      placeholder="List your key achievements relevant to this position... e.g., built and deployed scalable web applications,"
                      value={formData.keyAchievements}
                      onChange={(e) =>
                        handleInputChange("keyAchievements", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="yourExperience"
                    >
                      Your Relevant Experience
                    </label>
                    <textarea
                      id="yourExperience"
                      className="mt-1 w-full border rounded p-2 min-h-24"
                      placeholder="Briefly describe your relevant work experience and achievements..."
                      value={formData.yourExperience}
                      onChange={(e) =>
                        handleInputChange("yourExperience", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="whyInterested"
                    >
                      Why You're Interested
                    </label>
                    <textarea
                      id="whyInterested"
                      className="mt-1 w-full border rounded p-2 min-h-24"
                      placeholder="Explain why you're interested in this role and company..."
                      value={formData.whyInterested}
                      onChange={(e) =>
                        handleInputChange("whyInterested", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleGenerateWithAI}
                  className="flex-1 bg-indigo-600 text-white font-medium py-2 px-4 rounded hover:bg-indigo-700 flex items-center justify-center"
                >
                  Generate with AI
                </button>
                {isLoading && <LoadingScreen />}
              </div>
            </div>

            {/* Preview */}
            <div className="space-y-6">
              <div className="bg-white border rounded-lg shadow-sm">
                <div className="border-b p-4">
                  <h2 className="text-lg font-semibold">
                    Cover Letter Preview
                  </h2>
                </div>
                <div
                  id="cv-content"
                  className="p-12 min-h-[600px] space-y-4 text-sm text-gray-700 text-left"
                >
                  <div className="text-left text-gray-600">
                    <div className=" ">
                      {formData.yourName || "[Your Name]"}
                    </div>
                    <div>{formData.yourEmail || "[Your Email]"}</div>
                    <div>{formData.yourPhoneNumber || "[Your Phone]"}</div>
                    <div>{formData.yourAddress || "[Your Address]"}</div>
                    <div className="mt-4">
                      {new Date().toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-left text-gray-600">
                    <div>{formData.hiringManager || "[HR Name]"}</div>
                    <div>{formData.companyName || "[Company Name]"}</div>
                    <div>{formData.companyAddress || "[Company Address]"}</div>
                  </div>
                  <div className="font-semibold text-left">
                    Dear {formData.hiringManager || "Hiring Manager"},
                  </div>
                  <p>
                    I am writing to express my strong interest in the{" "}
                    <span className="font-medium">
                      {formData.jobTitle || "[Job Title]"}
                    </span>{" "}
                    position at{" "}
                    <span className="font-medium">
                      {formData.companyName || "[Company Name]"}
                    </span>
                    . With my background in software development and passion for
                    innovation, I am excited about the opportunity to contribute
                    to your team.
                  </p>
                  <p>
                    In my previous role, I developed strong proficiency in{" "}
                    <span className="font-medium">
                      {formData.keySkills ||
                        "[relevant technologies and skills]"}
                    </span>{" "}
                    and have successfully{" "}
                    <span className="font-medium">
                      {formData.keyAchievements ||
                        "[mention key achievements, e.g., built and deployed scalable web applications, or improved performance and user experience across multiple projects]"}
                    </span>{" "}
                    My experience in{" "}
                    <span className="font-medium">
                      {formData.yourExperience ||
                        "[specific area, e.g., full-stack development or building responsive and dynamic user interfaces]"}
                    </span>{" "}
                    aligns well with the requirements outlined in your job
                    posting.
                  </p>
                  <p>
                    What particularly attracts me to this position is the
                    opportunity to contribute to a forward-thinking and
                    impactful team. I’m inspired by the company’s commitment to
                    innovation and excellence, and I would be excited to bring
                    my skills and dedication to support its ongoing growth and
                    success.
                  </p>
                  <p>
                    I would welcome the opportunity to discuss how my skills and
                    enthusiasm can contribute to your team's continued success.
                    Thank you for considering my application.
                  </p>
                  <div className="mt-6">
                    <div>Sincerely,</div>
                    <div className="mt-4 font-medium">
                      {formData.yourName || "[Your Name]"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={previewAsPDF}
                  className="flex-1 border border-gray-300 rounded py-2 px-4 flex items-center justify-center"
                >
                  Full Preview
                </button>
                <button
                  onClick={downloadAsPDF}
                  className="flex-1 bg-indigo-600 text-white font-medium py-2 px-4 rounded hover:bg-indigo-700 flex items-center justify-center"
                >
                  Download PDF
                </button>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">💡 AI Tips</h3>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Customize each cover letter for the specific job</li>
                  <li>• Use keywords from the job description</li>
                  <li>• Keep it concise - one page maximum</li>
                  <li>• Show enthusiasm and personality</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default CoverLetter;
