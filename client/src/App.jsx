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

function App() {
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
