import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Deepfake from "./pages/Deepfake";
import Phishing from "./pages/Phishing";
import About from "./pages/About";
import Report from "./pages/Report";

function App() {
  return (
    <Router>
      <div className="w-100 h-[104] bg-gray-100 text-black flex flex-col">
        <Navbar />
        <main className="flex-grow p-2 overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/deepfake" element={<Deepfake />} />
            <Route path="/phishing" element={<Phishing />} />
            <Route path="/about" element={<About />} />
            <Route path="/report" element={<Report />} />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
