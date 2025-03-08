import React from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaChartBar, FaUserSecret, FaShieldAlt, FaInfoCircle } from "react-icons/fa";

const Navbar = () => {
  const menuItems = [
    { icon: <FaTachometerAlt size={20} />, label: "Dashboard", path: "/" },
    { icon: <FaChartBar size={20} />, label: "Reports", path: "/report" },
    { icon: <FaUserSecret size={20} />, label: "Deepfake Detection", path: "/deepfake" },
    { icon: <FaShieldAlt size={20} />, label: "Phishing Detection", path: "/phishing" },
    { icon: <FaInfoCircle size={20} />, label: "About", path: "/about" },
  ];

  return (
    <nav className="bg-gray-900 p-2 border-t-2 border-cyan-500 shadow-lg flex justify-center w-full">
      <div className="flex space-x-4">
        {menuItems.map((item, index) => (
          <div key={index} className="relative group bg-gray-800 p-2 rounded-lg shadow-md flex justify-center items-center">
            <Link to={item.path} className="bg-cyan-400 text-black font-bold p-2 rounded-md flex items-center justify-center">
              {item.icon}
            </Link>
            <span className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
