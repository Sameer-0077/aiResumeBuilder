import React from "react";
import { useLocation } from "react-router-dom";

function DownloadCoverLetter() {
  const location = useLocation();
  const { coverLetterData } = location.state || {};

  if (!coverLetterData) return <p>No resume data available.</p>;

  const {
    yourName,
    yourEmail,
    yourAddress,
    yourPhoneNumber,
    jobTitle,
    hiringManager,
    companyName,
    companyAddress,
    greetings,
    openingParagraph,
    bodyParagraph1,
    bodyParagraph2,
    closingParagraph,
  } = coverLetterData;

  return (
    <div>
      <div
        id="cv-content"
        className="p-12 min-h-[600px] space-y-4 text-sm text-gray-700 text-left"
      >
        <div className="text-left text-gray-600">
          <div className=" ">{yourName || "[Your Name]"}</div>
          <div>{yourEmail || "[Your Email]"}</div>
          <div>{yourPhoneNumber || "[Your Phone]"}</div>
          <div>{yourAddress || "[Your Address]"}</div>
          <div className="mt-4">{new Date().toLocaleDateString()}</div>
        </div>
        <div className="text-left text-gray-600">
          <div>{hiringManager || "[HR Name]"}</div>
          <div>{companyName || "[Company Name]"}</div>
          <div>{companyAddress || "[Company Address]"}</div>
        </div>
        <div className="font-semibold text-left">{greetings},</div>
        <p>{openingParagraph}</p>
        <p>{bodyParagraph1}</p>
        <p>{bodyParagraph2}</p>
        <p>{closingParagraph}</p>
        <div className="mt-6">
          <div>Sincerely,</div>
          <div className="mt-4 font-medium">{yourName || "[Your Name]"}</div>
        </div>
      </div>
      <div className="flex gap-4">
        <button
          // onClick={previewAsPDF}
          className="flex-1 border border-gray-300 rounded py-2 px-4 flex items-center justify-center"
        >
          Full Preview
        </button>
        <button
          // onClick={downloadAsPDF}
          className="flex-1 bg-indigo-600 text-white font-medium py-2 px-4 rounded hover:bg-indigo-700 flex items-center justify-center"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}

export default DownloadCoverLetter;
