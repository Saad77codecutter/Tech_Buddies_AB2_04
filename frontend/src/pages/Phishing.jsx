import React, { useState } from "react";
import { motion } from "framer-motion";

const PhishingExtension = () => {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const analyzeEmail = async () => {
    setResult(null);
    setError(null);

    if (!inputText.trim()) {
      setError("Please enter the email content.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/detect-phishing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email_text: inputText.trim() }),
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data.prediction);
        await saveToDatabase("lagadsayali06@gmail.com", inputText.trim(), data.prediction);
      }
    } catch (err) {
      setError("Error connecting to server.");
    }
  };

  const saveToDatabase = async (emailId, emailBody, status) => {
    try {
      console.log(status)
      status=status==="Legit"?"legit":"phishing"
      const response = await fetch("http://localhost:5002/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email_id: emailId, email_body: emailBody, status }),
      });

      if (!response.ok) {
        console.error("Error storing email data:", response.statusText);
      }
    } catch (error) {
      console.error("Database request failed:", error.message);
    }
  };

  return (
    <div className="w-[350px] p-4 bg-gray-900 text-white rounded-xl shadow-lg border border-gray-800 relative">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-lg font-semibold text-center flex items-center gap-2 mb-4"
      >
        <span role="img" aria-label="email">📩</span> Email Phishing Analysis
      </motion.h2>
      
      <textarea
        className="w-full p-3 text-gray-200 bg-gray-800 rounded-md border border-gray-700 focus:ring-2 focus:ring-cyan-500 outline-none"
        rows="4"
        placeholder="Paste the email body here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></textarea>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-4 w-full py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-md shadow-md"
        onClick={analyzeEmail}
      >
        Analyze Email
      </motion.button>
      
      {result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`mt-4 p-3 text-center font-semibold rounded-md ${
            result === "Phishing"
              ? "bg-red-500 text-white"
              : "bg-green-500 text-white"
          }`}
        >
          <strong>Result:</strong> {result}
        </motion.div>
      )}
      
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-3 bg-yellow-500 text-gray-900 text-center font-semibold rounded-md"
        >
          <strong>Error:</strong> {error}
        </motion.div>
      )}
    </div>
  );
};

export default PhishingExtension;
