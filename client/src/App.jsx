import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ResumeBuilder from "./pages/ResumeBuilder";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
