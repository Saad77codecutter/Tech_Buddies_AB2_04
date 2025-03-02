import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Deepfake from "./pages/Deepfake";
import Phishing from "./pages/Phishing";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        {/* Main content area */}
        <main className="flex-grow">
          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/deepfake" element={<Deepfake />} />
            <Route path="/phishing" element={<Phishing />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;