import React from "react";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div>
      <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">AI Resume Builder</h1>
        <Link
          to="/resume-builder"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Start Building
        </Link>
      </div>
    </div>
  );
}

export default Home;
