import React from "react";
import { motion } from "framer-motion";
import { container, fadeInLeft } from "../../Animation";

function StepCertifications({ data, setData }) {
  const certifications = data.certifications || [
    {
      name: "",
      issuing_organization: "",
      month: "",
      year: "",
      link: "",
    },
  ];

  const updateCertification = (index, field, value) => {
    const updated = [...certifications];
    updated[index][field] = value;
    setData({ ...data, certifications: updated });
  };

  const addCertification = () => {
    setData({
      ...data,
      certifications: [
        ...certifications,
        {
          name: "",
          issuing_organization: "",
          month: "",
          year: "",
          link: "",
        },
      ],
    });
  };

  const removeCertification = (index) => {
    const updated = [...certifications];
    updated.splice(index, 1);
    setData({ certifications: updated });
  };

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 50 }, (_, i) => currentYear - i);
  const monthOptions = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={fadeInLeft}
    >
      {certifications.map((cert, index) => (
        <div
          key={index}
          className="space-y-3 border p-4 rounded shadow-sm relative"
        >
          <input
            type="text"
            placeholder="Certification Name"
            value={cert.name}
            onChange={(e) => updateCertification(index, "name", e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Issuing Organization"
            value={cert.issuing_organization}
            onChange={(e) =>
              updateCertification(index, "issuing_organization", e.target.value)
            }
            className="w-full border p-2 rounded"
          />

          <div className="flex gap-4">
            <select
              value={cert.month}
              onChange={(e) =>
                updateCertification(index, "month", e.target.value)
              }
              className="w-1/2 border p-2 rounded"
            >
              <option value="">Month</option>
              {monthOptions.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>

            <select
              value={cert.year}
              onChange={(e) =>
                updateCertification(index, "year", e.target.value)
              }
              className="w-1/2 border p-2 rounded"
            >
              <option value="">Year</option>
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <input
            type="text"
            placeholder="Certification Link (optional)"
            value={cert.link}
            onChange={(e) => updateCertification(index, "link", e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
      ))}
      {certifications?.length > 1 && (
        <label
          className="block font-medium text-md text-right text-gray-700 cursor-pointer"
          onClick={() => removeCertification(certifications.length - 1)}
        >
          ❌
        </label>
      )}

      <button
        onClick={addCertification}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
      >
        + Add Certification
      </button>
    </motion.div>
  );
}

export default StepCertifications;
