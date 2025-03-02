import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 bg-gradient-to-r from-gray-800 to-gray-900 sticky top-0 z-50 shadow-lg transition duration-300">

      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between py-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-200">
          <Link
            to="/home"
            className="hover:text-blue-400 transition-transform transform hover:scale-105"
          >
            Deepfake Detector
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          {["Home", "Deepfake", "Phishing", "About"].map((item, index) => (
            <li key={index} className="relative">
              <Link
                to={`/${item.toLowerCase()}`}
                className="text-lg font-semibold text-gray-200 hover:text-blue-400 transition relative pb-2"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
