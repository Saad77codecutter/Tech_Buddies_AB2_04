import React from "react";

const About = () => {
  return (
    <div className="bg-black text-white p-8 rounded-lg shadow-lg border border-cyan-500 max-w-4xl mx-auto">
      {/* About Fake Detection System */}
      <h2 className="text-cyan-400 text-2xl font-bold text-center mb-4">◆ About Fake Detection System</h2>
      <p className="text-gray-300 text-center mb-6">
        Our Fake Detection System is an advanced AI-powered solution designed to analyze and detect deepfake content and phishing attempts. By leveraging machine learning algorithms, our system ensures high accuracy in identifying manipulated media and fraudulent emails.
      </p>

      {/* Deepfake Detection */}
      <h2 className="text-cyan-400 text-2xl font-bold text-center mb-4">◆ Deepfake Detection</h2>
      <p className="text-gray-300 text-center mb-6">
        Deepfake detection uses AI models to analyze videos, images, and audio for signs of manipulation. Our system examines inconsistencies in facial movements, lighting, and voice modulation to flag potential deepfake content.
      </p>

      {/* Phishing Detection */}
      <h2 className="text-cyan-400 text-2xl font-bold text-center mb-4">◆ Phishing Detection</h2>
      <p className="text-gray-300 text-center mb-6">
        Our phishing detection module scans emails and URLs to detect suspicious activity. It analyzes message patterns, domain authenticity, and malicious links to prevent cyber threats.
      </p>

      {/* Meet Our Team */}
      <h2 className="text-cyan-400 text-2xl font-bold text-center mb-6">◆ Meet Our Team</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {[
          { name: "Pankaj Maske", phone: "+91 8857806599", email: "pankajmaske045@gmail.com" },
          { name: "Md Saad Siddiqui", phone: "+91 9529576523", email: "saadsiddiquikingindia5@gmail.com" },
          { name: "Sayali", phone: "+91 8849163156", email: "lagadsayali06@gmail.com" },
        ].map((member, index) => (
          <div key={index} className="bg-gray-900 border border-cyan-500 p-4 rounded-lg shadow-md text-center w-64">
            <h3 className="text-lg font-bold text-cyan-300">{member.name}</h3>
            <p className="text-sm text-gray-400 mt-2">📞 {member.phone}</p>
            <p className="text-sm text-gray-400 mt-2">✉ {member.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;