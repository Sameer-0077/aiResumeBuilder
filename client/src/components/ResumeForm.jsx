// App.jsx
import { useNavigate } from "react-router-dom";
import { degrees } from "framer-motion";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { container, fadeInUp } from "../Animation";
import {
  StepPersonal,
  StepEducation,
  StepExperience,
  StepProjects,
  StepCertifications,
  StepSkills,
  StepSummary,
} from "./resumeSteps/index";
import LoadingScreen from "./LoadingScreen";

function StepIndicator({ steps, currentStep }) {
  return (
    <div className="relative flex flex-wrap justify-between items-center gap-y-6 mb-6">
      {/* Horizontal line behind step circles */}
      <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-300 z-0" />

      {steps.map((step, idx) => (
        <div
          key={idx}
          className="relative z-10 flex-1 min-w-[80px] text-center"
        >
          {/* Circle */}
          <div
            className={`mx-auto mb-2 h-10 w-10 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all duration-300
              ${
                idx < currentStep
                  ? "border-green-600 bg-green-600 text-white"
                  : idx === currentStep
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-300 bg-white text-gray-500"
              }`}
          >
            {idx < currentStep ? "✔️" : idx + 1}
          </div>

          {/* Step label */}
          <div className="text-xs sm:text-sm break-words">{step}</div>
        </div>
      ))}
    </div>
  );
}

export default function ResumeForm() {
  const steps = [
    "Personal Info",
    "Summary",
    "Experience",
    "Projects",
    "Education",
    "Skills",
    "Certifications",
  ];
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const update = (fields) => setFormData((prev) => ({ ...prev, ...fields }));

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!formData || Object.keys(formData).length === 0)
      return alert("Error: User details are required!");

    setIsLoading(true);
    try {
      const res = await fetch(
        "http://localhost:8000/api/resume/generate-resume",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      console.log("Original Data ----");
      console.log(res);

      const data = await res.json();

      if (!res.ok) return alert(data.error);

      console.log("Generated Resume --------");
      console.log(data);
      sessionStorage.removeItem("resumeSaved");
      navigate("/download/resume", {
        state: { resumeData: data, newResume: true },
      });
    } catch (error) {
      console.log("Getting some error: ", error);
      alert("Server error: Failed to fetch");
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StepPersonal data={formData} setData={update} />;
      case 1:
        return <StepSummary data={formData} setData={update} />;
      case 2:
        return <StepExperience data={formData} setData={update} />;
      case 3:
        return <StepProjects data={formData} setData={update} />;
      case 4:
        return <StepEducation data={formData} setData={update} />;
      case 5:
        return <StepSkills data={formData} setData={update} />;
      case 6:
        return <StepCertifications data={formData} setData={update} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <h1 className="text-2xl font-bold mb-6 text-center">Create Resume 😎</h1>
      <StepIndicator steps={steps} currentStep={currentStep} />

      <div className="bg-white p-6 rounded shadow">
        {renderStep()}

        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
            className="px-4 py-2 rounded border"
            disabled={currentStep === 0}
          >
            Previous
          </button>

          <button
            onClick={() => {
              if (currentStep < steps.length - 1) {
                setCurrentStep((prev) => prev + 1);
              } else {
                handleSubmit();
              }
            }}
            className="px-4 py-2 rounded bg-blue-600 text-white"
          >
            {currentStep < steps.length - 1 ? "Next" : "Submit"}
          </button>
          {isLoading && <LoadingScreen />}
        </div>
      </div>
    </motion.div>
  );
}

// import React from "react";
// import { useState } from "react";

// function ResumeForm() {
//   const [formData, setFormData] = useState({
//     name: "",
//     education: "",
//     experience: "",
//     projects: "",
//     skill: "",
//     achievements: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Form submitted:", formData);
//     console.log("Form submitted:", formData);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white p-6 rounded shadow-md space-y-4"
//     >
//       {Object.entries(formData).map(([field, value]) => (
//         <div key={field}>
//           <label className="block font-semibold capitalize mb-1">{field}</label>
//           <textarea
//             name={field}
//             value={value}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             rows={field === "experience" || field === "achievements" ? 4 : 2}
//           />
//         </div>
//       ))}
//       <button
//         type="submit"
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         Generate Resume
//       </button>
//     </form>
//   );
// }

// export default ResumeForm;
