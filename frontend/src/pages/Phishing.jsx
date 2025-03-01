import React, { useState } from "react";

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_text: inputText.trim(),
          url: inputUrl.trim(),
        }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data.prediction);
      }
    } catch (err) {
      setError("Error connecting to server.");
    }
  };

  return (
    <div className="container mx-auto px-4">
      {/* Phishing Analysis Section */}
      <section className="py-12 bg-white rounded-lg shadow-md my-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Phishing Detection</h2>
        <p className="text-lg text-gray-600 mb-6">
          Paste the content of an email or enter a suspicious URL below to analyze it for potential phishing.
        </p>
        
        {/* Email Content Input */}
        <textarea
          rows="5"
          placeholder="Paste email content here..."
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>

        {/* URL Input */}
        <input
          type="text"
          placeholder="Or enter a URL here..."
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
        />

        {/* Analyze Button */}
        <button
          onClick={analyzeText}
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
        >
          Analyze
        </button>

        {/* Display Result */}
        {result && (
          <div className={`mt-4 p-4 rounded ${result === "Phishing" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
            <strong>Result:</strong> {result}
          </div>
        )}

        {/* Display Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-yellow-100 text-yellow-700 rounded">
            <strong>Error:</strong> {error}
          </div>
        )}
      </section>
    </div>
  );
};

export default Phishing;
