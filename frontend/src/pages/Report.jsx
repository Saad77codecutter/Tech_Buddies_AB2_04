import React, { useEffect, useState } from "react";

const Report = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const emailRes = await fetch("http://localhost:5002/emails");
        const videoRes = await fetch("http://localhost:5002/videos");

        const emailData = await emailRes.json();
        const videoData = await videoRes.json();

        const formattedEmails = emailData.map((email) => ({
          date: email.date,
          type: "Email",
          result: "Suspicious",
          icon: "🟠",
          color: "text-orange-500",
        }));

        const formattedVideos = videoData.map((video) => ({
          date: video.date,
          type: "Video",
          result: "Deepfake",
         
          icon: "🔴",
          color: "text-red-500",
        }));

        setReports([...formattedEmails, ...formattedVideos]);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-cyan-500 max-w-lg mx-auto mt-10">
      <h2 className="text-cyan-400 text-xl font-bold flex items-center">
        <span className="mr-2">📄</span> Reports
      </h2>
      <p className="text-gray-300 text-sm mt-2">View your past scan results.</p>
      
      <div className="mt-4 border border-cyan-500 rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-cyan-500 text-black">
              <th className="p-2">Date</th>
              <th className="p-2">Type</th>
              <th className="p-2">Result</th>
         
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={index} className="bg-gray-800 text-white">
                <td className="p-2">{report.date}</td>
                <td className="p-2">{report.type}</td>
                <td className="p-2 flex items-center">
                  <span className={`${report.color} mr-2`}>{report.icon}</span> 
                  {report.result}
                </td>
                <td className="p-2">{report.confidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
