import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 sticky top-0 z-50 shadow-lg transition duration-300">
      <div className="container mx-auto px-4 flex items-center justify-between py-4">
        {/* Left-aligned logo */}
        <div className="logo">
          <Link to="/" className="text-2xl font-bold text-gray-100 hover:text-blue-400 transition transform hover:scale-105">
            Deepfake Detector
          </Link>
        </div>
        {/* Simplified nav links */}
        <ul className="flex space-x-8">
          <li>
            <Link to="/" className="text-lg font-semibold text-gray-100 hover:text-blue-400 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/deepfake" className="text-lg font-semibold text-gray-100 hover:text-blue-400 transition">
              Deepfake
            </Link>
          </li>
          <li>
            <Link to="/phishing" className="text-lg font-semibold text-gray-100 hover:text-blue-400 transition">
              Phishing
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-lg font-semibold text-gray-100 hover:text-blue-400 transition">
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;