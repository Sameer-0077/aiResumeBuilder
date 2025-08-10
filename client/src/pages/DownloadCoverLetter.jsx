import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import html2pdf from "html2pdf.js";
import useUserStore from "../store/userStore";

function DownloadCoverLetter() {
  const location = useLocation();
  const { coverLetterData, newCover } = location.state || {};
  const user = useUserStore((state) => state.user);

  if (!coverLetterData) return <p>No cover letter available.</p>;

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

  const previewAsPDF = () => {
    const element = document.getElementById("cover-letter-content");
    const opt = {
      margin: 0,
      filename: `${yourName}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2, dpi: 300 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf()
      .set(opt)
      .from(element)
      .outputPdf("bloburl") //  This creates a previewable Blob URL
      .then((pdfUrl) => {
        window.open(pdfUrl, "_blank"); //  Opens preview in a new tab
      });
  };
  const downloadAsPDF = () => {
    const element = document.getElementById("cover-letter-content");
    const opt = {
      margin: 0,
      filename: `${yourName}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2, dpi: 300 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  const saveCoverLetter = async () => {
    try {
      const res = await fetch(
        "http://localhost:8000/api/resume/save-cover-letter",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(coverLetterData),
        }
      );

      const result = await res.json();
      if (!res.ok) {
        return console.log("Error: cover-letter doesn't saved", result.error);
      }

      return console.log(result.status);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };
  useEffect(() => {
    if (newCover && !sessionStorage.getItem("coverLetterSaved") && user) {
      saveCoverLetter();
      sessionStorage.setItem("coverLetterSaved", "true");
    }
  }, [newCover]);

  return (
    <div>
      <div
        id="cover-letter-content"
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
          onClick={previewAsPDF}
          className="flex-1 border border-gray-300 hover:bg-gray-200 rounded py-2 px-4 flex items-center justify-center"
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
    </div>
  );
}

export default DownloadCoverLetter;
