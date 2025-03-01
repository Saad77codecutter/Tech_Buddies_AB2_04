import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="py-12 bg-white rounded-lg shadow-md my-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to the Deepfake & Social Engineering Attack Detector
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Our advanced detection technology uses state-of-the-art machine learning algorithms to identify deepfake videos and phishing attempts. Stay secure and informed with our cutting‑edge platform.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/deepfake">
            <button className="px-6 py-3 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition">
              Analyze Video
            </button>
          </Link>
          <Link to="/phishing">
            <button className="px-6 py-3 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition">
              Analyze Email/URL
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white rounded-lg shadow-md my-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Key Features</h2>
        <ul className="text-left max-w-3xl mx-auto list-disc space-y-2 text-gray-600">
          <li>
            <strong>Deepfake Detection:</strong> Analyze videos frame‑by‑frame using advanced facial recognition techniques.
          </li>
          <li>
            <strong>Phishing Detection:</strong> Scan emails and URLs to identify suspicious activity.
          </li>
          <li>
            <strong>Real‑time Alerts:</strong> Receive immediate warnings for suspicious content.
          </li>
          <li>
            <strong>Comprehensive Reports:</strong> View historical data and detailed analysis.
          </li>
        </ul>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-white rounded-lg shadow-md my-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Users Say</h2>
        <blockquote className="text-lg text-gray-600 italic mb-4">
          “This tool has saved my company from several phishing attempts and provided peace of mind.”
        </blockquote>
        <p className="font-semibold text-gray-800">– Alex M.</p>
        <blockquote className="text-lg text-gray-600 italic mt-8 mb-4">
          “The deepfake detector is incredibly accurate and easy to use. A must-have for any organization.”
        </blockquote>
        <p className="font-semibold text-gray-800">– Jamie R.</p>
      </section>
    </div>
  );
};

export default Home;