import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function CoverCard({ userData }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/download/cover-letter", {
      state: { coverLetterData: userData, newCover: false },
    });
  };
  const {
    yourName,
    yourEmail,
    yourPhoneNumber,
    yourAddress,
    hiringManager,
    companyName,
    companyAddress,
    greetings,
    openingParagraph,
    bodyParagraph1,
    bodyParagraph2,
    closingParagraph,
  } = userData;

  return (
    <motion.div
      className="bg-white p-3 rounded-lg shadow-md max-w-xs w-full font-[Times_New_Roman] text-sm  space-y-2 h-full min-h-[350px] text-left cursor-pointer hover:bg-blue-100"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      onClick={handleClick}
    >
      {/* Sender Info */}
      <div className="text-gray-600 text-[11px] leading-tight">
        <div>{yourName || "[Your Name]"}</div>
        <div>{yourEmail || "[Your Email]"}</div>
        <div>{yourPhoneNumber || "[Your Phone]"}</div>
        <div>{yourAddress || "[Your Address]"}</div>
        <div className="mt-1">{new Date().toLocaleDateString()}</div>
      </div>

      {/* Receiver Info */}
      <div className="text-gray-600 text-[11px] leading-tight">
        <div>{hiringManager || "[HR Name]"}</div>
        <div>{companyName || "[Company Name]"}</div>
        <div>{companyAddress || "[Company Address]"}</div>
      </div>

      {/* Greeting */}
      <div className="font-semibold text-xs">
        {greetings || "Dear [Name]"} ,
      </div>

      {/* Body */}
      <div className="space-y-1 text-[11px] leading-snug">
        <p>{openingParagraph || "[Opening paragraph here...]"} </p>
        <p>{bodyParagraph1 || "[Body paragraph 1 here...]"} </p>
        <p>{closingParagraph || "[Closing paragraph here...]"} </p>
      </div>

      {/* Signature */}
      <div className="mt-2 text-[11px]">
        <div>Sincerely,</div>
        <div className="mt-2 font-medium">{yourName || "[Your Name]"}</div>
      </div>
    </motion.div>
  );
}

export default CoverCard;
