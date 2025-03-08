import React, { useState } from "react";
import { motion } from "framer-motion";

const DeepfakeDetector = () => {
  const [video, setVideo] = useState(null);
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const allowedFormats = ["video/mp4", "video/avi", "video/mov", "video/mkv"];

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (!allowedFormats.includes(file.type)) {
        alert("Invalid file format! Please upload a valid video file (MP4, AVI, MOV, MKV).");
        return;
      }
      setVideo(file);
      setFileName(file.name);
      setResult(""); // Reset previous result
    }
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

      // After detection, store video data in the database
      const val=data.prediction=="FAKE"?"fake":"real"
      await saveToDatabase(fileName, val);
    } catch (error) {
      setResult("Error detecting deepfake");
    } finally {
      setLoading(false);
    }
  };

  // Function to store video analysis result in the database
  const saveToDatabase = async (videoName, status) => {
    try {
      const response = await fetch("http://localhost:5002/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ video_name: videoName, status }),
      });
  
      const responseData = await response.json();
      console.log("Database response:", responseData);  // Log response
  
      if (!response.ok) {
        console.error("Error inserting video data:", response.statusText);
      }
    } catch (error) {
      console.error("Database request failed:", error.message);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center">
      {/* Page Title */}
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-gray-200 mb-8 text-center"
      >
        Deepfake Detection
      </motion.h1>

      {/* Upload Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-gray-800 text-white rounded-lg shadow-lg p-6 w-full max-w-5xl text-center border border-gray-700 relative"
      >
        <h2 className="text-2xl font-semibold mb-3">Upload Video for Deepfake Analysis</h2>
        
        <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center">
          📂 Upload Video
          <input
            type="file"
            accept="video/mp4, video/avi, video/mov, video/mkv"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {fileName && <p className="text-sm mt-2 text-gray-300">Selected: {fileName}</p>}

        <motion.button
          onClick={handleUpload}
          disabled={loading}
          whileTap={{ scale: 0.95 }}
          className={`mt-5 px-6 py-3 w-full max-w-xs font-semibold rounded-lg transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-teal-500 hover:bg-teal-600"
          }`}
        >
          {loading ? "Analyzing..." : "Analyze Video"}
        </motion.button>
         
        {/* Result Display */}
        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`mt-6 p-4 text-lg font-semibold rounded-lg ${
              result === "FAKE" ? "bg-red-600 text-white" : "bg-green-600 text-white"
            }`}
          >
            Result: {result === "FAKE" ? "FAKE" : "REAL"}
          </motion.div>
        )}
      </motion.section>
    </div>
  );
};

export default DeepfakeDetector;
