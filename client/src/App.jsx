import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ResumeBuilder from "./pages/ResumeBuilder";
import "./App.css";
import Layout from "./Layout";
import CoverLetter from "./pages/CoverLetter";
import Dashboard from "./pages/Dashboard";
import Download from "./pages/Download";
import SignIn from "./pages/SignIn";

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
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/download" element={<Download />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
