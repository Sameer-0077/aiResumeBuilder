import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const TestPrintComponent = () => {
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "test-print",
    removeAfterPrint: true,
  });

  return (
    <div className="p-6">
      <div className="text-center mb-4">
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Print Test Page
        </button>
      </div>

      {/* Printable Area */}
      <div
        ref={printRef}
        className="bg-white p-6 max-w-[800px] mx-auto border shadow-md text-left font-serif"
        style={{ width: "210mm", minHeight: "297mm" }}
      >
        <h1 className="text-2xl font-bold mb-2">Test Print</h1>
        <p className="text-sm mb-2">
          This is a test page to verify that printing with `react-to-print`
          works.
        </p>
        <p className="text-sm">
          All text should be left-aligned and printed on an A4-sized document
          with proper font and layout.
        </p>
      </div>
    </div>
  );
};

export default TestPrintComponent;
