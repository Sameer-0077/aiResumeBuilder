import React from "react";
import { useState } from "react";

function ResumeForm() {
  const [formData, setFormData] = useState({
    name: "",
    education: "",
    experience: "",
    projects: "",
    skill: "",
    achievements: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted:", formData);
    console.log("Form submitted:", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md space-y-4"
    >
      {Object.entries(formData).map(([field, value]) => (
        <div key={field}>
          <label className="block font-semibold capitalize mb-1">{field}</label>
          <textarea
            name={field}
            value={value}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={field === "experience" || field === "achievements" ? 4 : 2}
          />
        </div>
      ))}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Generate Resume
      </button>
    </form>
  );
}

export default ResumeForm;
