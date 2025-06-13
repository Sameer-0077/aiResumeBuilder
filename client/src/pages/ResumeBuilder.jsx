import React from "react";
import ResumeForm from "../components/ResumeForm";

function ResumeBuilder() {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Resume Builder</h1>
      <ResumeForm />
    </div>
  );
}

export default ResumeBuilder;
