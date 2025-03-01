import React, { useState } from "react";

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
  
    console.log("Sending video to the server...");  // Debug: Check if the video is selected
    try {
      const response = await fetch("http://127.0.0.1:5001/detect-deepfake", {
        method: "POST",
        body: formData,
      });
  
      console.log("Received response from server");  // Debug: Log when response is received
  
      if (!response.ok) {
        console.error("Server error:", response.statusText);
        setResult("Error from server: " + response.statusText);
        return;
      }
  
      const data = await response.json();
      console.log("Response data:", data);  // Debug: Log the data received from the server
  
      setResult(data.prediction || data.error);
    } catch (error) {
      console.error("Error:", error);  // Debug: Log any error that occurs during fetch
      setResult("Error detecting deepfake");
    } finally {
      setLoading(false);
      console.log("Loading finished");  // Debug: Log when loading finishes
    }
  };
  

  return (
    <div className="container mx-auto px-4">
      {/* Deepfake Analysis Section */}
      <section className="py-12 bg-white rounded-lg shadow-md my-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Deepfake Detection</h2>
        <p className="text-lg text-gray-600 mb-6">
          Upload a video file to analyze it for potential deepfake manipulation.
        </p>
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleUpload}
          disabled={loading}
          className={`px-6 py-3 text-white font-semibold rounded-lg ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Analyzing..." : "Detect Deepfake"}
        </button>

        {/* Display Result */}
        {result && (
          <div className={`mt-6 p-4 text-lg font-semibold rounded ${result === "FAKE" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
            Prediction: {result}
          </div>
        )}
      </section>

      {/* How It Works Section */}
      <section className="py-12 bg-white rounded-lg shadow-md my-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
        <p className="text-lg text-gray-600">
          Our deepfake detection tool processes video frames using AI-powered neural networks to detect anomalies.
        </p>
        <p className="text-lg text-gray-600 mt-4">
          The process takes only a few moments for short videos.
        </p>
      </section>
    </div>
  );
};

export default Deepfake;
