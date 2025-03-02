import React, { useState } from "react";
import { motion } from "framer-motion";

const Phishing = () => {
  const [inputText, setInputText] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Function to analyze the input
  const analyzeText = async () => {
    setResult(null);
    setError(null);

    if (!inputText.trim() && !inputUrl.trim()) {
      setError("Please enter some email content or a URL.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/detect-phishing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email_text: inputText.trim(),
          url: inputUrl.trim(),
        }),
      });

      const data = await response.json();
      if (data.error) setError(data.error);
      else setResult(data.prediction);
    } catch (err) {
      setError("Error connecting to server.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="container mx-auto px-4 py-12 flex flex-col items-center"
    >
      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl font-bold text-gray-800 mb-8 text-center"
      >
        Phishing Detection
      </motion.h1>

      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl text-center border border-gray-200"
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">
          Analyze Email or URL
        </h2>
        <p className="text-gray-600 mb-6">
          Paste the content of an email or enter a suspicious URL below to check for phishing attempts.
        </p>

        {/* Email Content Input */}
        <motion.textarea
          whileFocus={{ scale: 1.02 }}
          rows="5"
          placeholder="Paste email content here..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition duration-200"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></motion.textarea>

        {/* URL Input */}
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="text"
          placeholder="Or enter a URL here..."
          className="w-full p-3 mt-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition duration-200"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
        />

        {/* Analyze Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={analyzeText}
          className="mt-5 px-6 py-3 text-white font-semibold rounded-lg transition bg-blue-600 hover:bg-blue-700"
        >
          Analyze
        </motion.button>

        {/* Display Result */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`mt-6 p-4 text-lg font-semibold rounded-lg ${
              result === "Phishing"
                ? "bg-red-100 text-red-600 border border-red-400"
                : "bg-green-100 text-green-600 border border-green-400"
            }`}
          >
            <strong>Result:</strong> {result}
          </motion.div>
        )}

        {/* Display Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-6 p-4 bg-yellow-100 text-yellow-700 border border-yellow-400 rounded-lg"
          >
            <strong>Error:</strong> {error}
          </motion.div>
        )}
      </motion.section>

      {/* How It Works Section (Reveals on Scroll) */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-5xl text-center border border-gray-300 mt-12"
      >
        <h2 className="text-2xl font-semibold text-gray-700">How It Works</h2>
        <div className="mt-4 space-y-4 text-gray-600 text-lg text-left">
          <motion.p whileHover={{ scale: 1.02 }}>
            🔹 Our phishing detection system scans text for known
            <strong> phishing keywords, patterns, and suspicious URLs</strong>.
          </motion.p>
          <motion.p whileHover={{ scale: 1.02 }}>
            🔹 It analyzes URLs for <strong>blacklisted domains</strong> and
            potential fraudulent behavior.
          </motion.p>
          <motion.p whileHover={{ scale: 1.02 }}>
            🔹 The system ensures <strong>real-time threat analysis</strong> for
            quick and accurate detection.
          </motion.p>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Phishing;
