import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      {/* Header */}
      <header className="text-center text-teal-400 text-3xl font-bold">
        🔍 Deepfake & Phishing Detector Dashboard
      </header>

      {/* Real-Time Threat Alerts */}
      <section className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg border border-teal-500">
        <h2 className="text-xl font-semibold text-yellow-400">⚠️ Real-Time Threat Alerts
        </h2>
        <table className="w-full mt-4 text-center">
          <thead>
            <tr className="bg-teal-500 text-black">
              <th className="p-2">Time</th>
              <th>Threat Type</th>
              <th>Details</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-600">
              <td className="p-2">10:30 AM</td>
              <td>Phishing</td>
              <td>Suspicious email from xyz.com</td>
              <td><button className="bg-blue-500 px-4 py-2 rounded">Report</button></td>
            </tr>
            <tr>
              <td className="p-2">10:35 AM</td>
              <td>Deepfake</td>
              <td>Fake video detected on YouTube</td>
              <td><button className="bg-blue-500 px-4 py-2 rounded">Investigate</button></td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Recent Scan Results */}
      <section className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg border border-teal-500">
        <h2 className="text-xl font-semibold text-teal-400">
          ◆ Recent Scan Results
        </h2>
        <table className="w-full mt-4 text-center">
          <thead>
            <tr className="bg-teal-500 text-black">
              <th className="p-2">Scanned Item</th>
              <th>Type</th>
              <th>Confidence Score</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-600">
              <td className="p-2">youtube.com/video123</td>
              <td>Video</td>
              <td>89%</td>
              <td className="text-red-500">Deepfake</td>
            </tr>
            <tr>
              <td className="p-2">user@xyz.com</td>
              <td>Email</td>
              <td>76%</td>
              <td className="text-orange-400">Suspicious</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Settings */}
      <section className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg border border-teal-500">
        <h2 className="text-xl font-semibold text-gray-300 flex items-center">
          ⚙️ Settings
        </h2>
        <div className="mt-4 space-y-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" checked readOnly />
            Enable Phishing Detection
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" checked readOnly />
            Enable Deepfake Detection
          </label>
          <label className="block">Adjust Detection Sensitivity:</label>
          <input type="range" className="w-full" />
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Send Email Alerts for Threats
          </label>
        </div>
      </section>
    </div>
  );
};

export default Home;