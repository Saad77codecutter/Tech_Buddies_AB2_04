import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="flex items-center justify-center py-16">
        <div className="max-w-5xl mx-auto bg-white p-10 rounded-xl shadow-lg border border-gray-200 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome to the Deepfake & Social Engineering Attack Detector
          </h2>
          <p className="text-gray-600 mt-6 leading-relaxed">
            Our advanced detection technology harnesses state-of-the-art
            machine learning algorithms to identify deepfake videos and
            phishing attempts. Stay secure and informed with our cutting-edge
            platform.
          </p>
          <div className="flex justify-center space-x-4 mt-6">
            <Link to="/deepfake">
              <button className="px-6 py-4 rounded-full bg-blue-500 text-white font-semibold shadow-md hover:bg-blue-600 transition">
                Analyze Video
              </button>
            </Link>
            <Link to="/phishing">
              <button className="px-6 py-4 rounded-full bg-blue-500 text-white font-semibold shadow-md hover:bg-blue-600 transition">
                Analyze Email/URL
              </button>
            </Link>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-12 text-center">
        <div className="max-w-5xl mx-auto bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800">Our Key Features</h2>
          <ul className="text-left mt-4 list-disc list-inside text-gray-600 space-y-3">
            <li>
              <strong>Deepfake Detection:</strong> Analyze videos using AI-driven
              facial recognition.
            </li>
            <li>
              <strong>Phishing Detection:</strong> Scan emails and URLs for
              suspicious activity.
            </li>
            <li>
              <strong>Real-time Alerts:</strong> Receive instant notifications
              for potential threats.
            </li>
            <li>
              <strong>Comprehensive Reports:</strong> Access historical data
              with detailed analysis.
            </li>
          </ul>
        </div>
      </section>

      {/* What Our Users Say */}
      <section className="py-12 bg-gray-200 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          What Our Users Say
        </h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Testimonial 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600 italic">
              "This tool saved me from falling for a phishing attack. Highly
              recommended!"
            </p>
            <div className="flex items-center mt-4">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="User"
                className="w-12 h-12 rounded-full"
              />
              <div className="ml-3">
                <h4 className="text-gray-800 font-semibold">John Doe</h4>
                <p className="text-gray-500 text-sm">Cybersecurity Analyst</p>
              </div>
            </div>
          </div>
          {/* Testimonial 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600 italic">
              "Deepfake detection is outstanding! It accurately flags fake
              videos."
            </p>
            <div className="flex items-center mt-4">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="User"
                className="w-12 h-12 rounded-full"
              />
              <div className="ml-3">
                <h4 className="text-gray-800 font-semibold">Emily Smith</h4>
                <p className="text-gray-500 text-sm">Journalist</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
