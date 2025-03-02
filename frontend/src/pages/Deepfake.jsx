import React, { useState } from "react";
import { motion } from "framer-motion";

const Deepfake = () => {
  const [video, setVideo] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setVideo(e.target.files[0]);
    setResult(""); // Reset previous result
  };

  const handleUpload = async () => {
    if (!video) {
      alert("Please select a video!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("video", video);

    try {
      const response = await fetch("http://127.0.0.1:5001/detect-deepfake", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        setResult("Error from server: " + response.statusText);
        return;
      }

      const data = await response.json();
      setResult(data.prediction || data.error);
    } catch (error) {
      setResult("Error detecting deepfake");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center">
      {/* Page Title */}
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-gray-800 mb-8 text-center"
      >
        Deepfake Detection
      </motion.h1>

      {/* Upload Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        whileHover={{ translateY: -5 }}
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-5xl text-center border border-gray-200 relative overflow-hidden"
      >
        <div className="absolute bottom-0 left-[-100%] w-[200%] h-1 bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500 group-hover:left-0"></div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">
          Upload Video
        </h2>
        <p className="text-gray-600 mb-6">
          Select a video file to analyze for potential deepfake manipulation.
        </p>
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <motion.button
          onClick={handleUpload}
          disabled={loading}
          whileTap={{ scale: 0.95 }}
          className={`mt-5 px-6 py-3 text-white font-semibold rounded-lg transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Analyzing..." : "Detect Deepfake"}
        </motion.button>

        {/* Result Display */}
        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`mt-6 p-4 text-lg font-semibold rounded-lg ${
              result === "FAKE"
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            Prediction: {result}
          </motion.div>
        )}
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        whileHover={{ translateY: -5 }}
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-5xl text-center border border-gray-300 mt-12 relative overflow-hidden"
      >
        <div className="absolute bottom-0 left-[-100%] w-[200%] h-1 bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500 group-hover:left-0"></div>
        <h2 className="text-2xl font-semibold text-gray-700">How It Works</h2>
        <div className="mt-4 space-y-4 text-gray-600 text-lg text-left">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}>
            🔹 Our deepfake detection tool processes video frames using{" "}
            <strong>AI-based facial recognition</strong> and{" "}
            <strong>neural networks</strong> to identify anomalies.
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.8 }}>
            🔹 It analyzes detected <strong>facial landmarks</strong> and
            compares them with genuine data to estimate the likelihood of
            manipulation.
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1 }}>
            🔹 The analysis typically takes a few moments for short videos,
            ensuring <strong>fast and accurate results</strong>.
          </motion.p>
        </div>
      </motion.section>
    </div>
  );
};

export default Deepfake;
