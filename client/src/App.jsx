import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ResumeBuilder from "./pages/ResumeBuilder";
import "./App.css";
import Layout from "./Layout";
import CoverLetter from "./pages/CoverLetter";
import Dashboard from "./pages/Dashboard";
import DownloadLayout from "./DownloadLayout";
import DownloadResume from "./pages/DownloadResume";
import DownloadCoverLetter from "./pages/DownloadCoverLetter";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import useUserStore from "./store/userStore";
import { useEffect } from "react";
import Contact from "./components/Contact";
import About from "./components/About";

function App() {
  const setUser = useUserStore((state) => state.setUser);

  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/auth/current-user", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        lreturn;
      } else {
        setUser(data.user);
        console.log(data.user);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/resume-builder" element={<ResumeBuilder />} />
              <Route path="/cover-letters" element={<CoverLetter />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about-us" element={<About />} />
              <Route path="/download" element={<DownloadLayout />}>
                <Route path="resume" element={<DownloadResume />} />
                <Route path="cover-letter" element={<DownloadCoverLetter />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
