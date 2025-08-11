import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";
import { motion } from "framer-motion";
import { fadeInUp, fadeInLeft } from "../Animation";
import CoverCard from "../components/CoverCard";
import ResumeCard from "../components/ResumeCard";

function Dashboard() {
  // const location = useLocation();
  const navigate = useNavigate();

  const user = useUserStore((state) => state.user);
  // const setUser = useUserStore((state) => state.setUser);

  // const resumeData = async () => {
  //   const res = await fetch("http://localhost:8000/api/resume/");
  // };

  const [hydrated, setHydrated] = useState(false);
  const [userAllResume, setUserAllResume] = useState([]);
  const [userAllCoverLetter, setUserAllCoverLetter] = useState([]);

  const allResume = async (userId) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/resume/get-resume/${userId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await res.json();

      if (!res.ok) throw new Error(result.error);

      console.log("Resume", result);
      setUserAllResume(result);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  const allCoverLetter = async (userId) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/resume/get-cover-letter/${userId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await res.json();

      if (!res.ok) throw new Error(result.error);

      console.log("CoverLetter", result);
      setUserAllCoverLetter(result);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      if (!user) {
        navigate("/login", { state: { toastMsg: "Please login" } });
      } else {
        allResume(user._id);
        allCoverLetter(user._id);
      }
    }
  }, [hydrated, user, navigate]);

  if (!hydrated) {
    return <div className="text-center mt-20 text-lg">Loading...</div>;
  }

  if (!user) return null;

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
      {/* <button className="text-right">Logout</button> */}
      <div className="flex flex-wrap ml-8 gap-2 justify-center">
        <h2 className="text-2xl font-bold text-center mt-4 mb-4">{`Hey👋 ${user.name}, welcome to AiResumeBuilder.`}</h2>
      </div>
      <div className="flex flex-wrap justify-evenly mx-2">
        <div>
          <h2 className="text-blue-500 text-2xl font-semibold">Resume📝</h2>
          <h3 className="text-xl font-semibold">
            Total resume generate :{" "}
            <span className="text-green-600 font-bold mt-2 ">
              {userAllResume.length}
            </span>
          </h3>
          <div className="flex flex-wrap gap-4 my-10 justify-center items-center">
            {userAllResume.map((resume) => (
              <ResumeCard key={resume._id} userData={resume.data} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-blue-500 text-2xl font-semibold">
            Cover letter📝
          </h2>
          <h3 className="text-xl font-semibold">
            Total cover letter create :{" "}
            <span className="text-green-600 font-bold mt-2">
              {userAllCoverLetter.length}
            </span>
          </h3>
          <div className="flex flex-wrap gap-4 my-10 justify-center items-center">
            {userAllCoverLetter.map((coverLetter) => (
              <CoverCard key={coverLetter._id} userData={coverLetter.data} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Dashboard;
