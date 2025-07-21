import React from "react";
const LoadingScreen = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-black/60 backdrop-blur-sm">
    {/* Spinner */}
    <svg
      className="h-16 w-16 animate-spin text-green-600 drop-shadow-lg sm:h-20 sm:w-20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" className="opacity-20" />
      <path d="M22 12a10 10 0 00-10-10" />
    </svg>

    <p className="animate-pulse text-center text-xl font-semibold tracking-wide text-white sm:text-2xl">
      Generating your resume…
    </p>

    <p className="max-w-xs text-center text-sm text-gray-200 sm:text-base">
      Hang tight—this usually takes just a few seconds.
    </p>
  </div>
);

export default LoadingScreen;
