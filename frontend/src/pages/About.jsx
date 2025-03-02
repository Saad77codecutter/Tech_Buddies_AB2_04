import React from "react";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* About Us Section */}
      <section className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg shadow-lg p-10 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-6">About Us</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          <span className="font-semibold">Deepfake Detector</span> was developed with a mission to empower organizations and individuals 
          to identify digital manipulation and protect against social engineering attacks.
        </p>
        <p className="text-lg text-gray-700 mt-4 max-w-3xl mx-auto">
          Our team consists of cybersecurity experts, data scientists, and engineers passionate about building secure and reliable detection systems.
        </p>
      </section>

      {/* Tech Buddies Section */}
      <section className="mt-12 bg-white rounded-lg shadow-lg p-10 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-6">Meet Our Tech Buddies</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
          We are a group of tech enthusiasts and problem solvers who work together on innovative solutions. 
          Our diverse skill sets help us build secure, efficient, and impactful projects.
        </p>
        
        {/* Team Members */}
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { name: "Saad", role: "Cybersecurity & AI", img: "https://via.placeholder.com/100" },
            { name: "Sayli", role: "Full-Stack Developer", img: "https://via.placeholder.com/100" },
            { name: "Pankaj", role: "Data Scientist", img: "https://via.placeholder.com/100" },
          ].map((member, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md text-center w-48">
              <img src={member.img} alt={member.name} className="w-20 h-20 mx-auto rounded-full mb-3" />
              <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="mt-12 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg shadow-lg p-10 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-6">Contact Us</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-4">
          For inquiries, support, or feedback, reach out via email or follow us on our social media channels.
        </p>
        <p className="text-lg font-semibold text-blue-500">
          <a href="mailto:support@example.com">support@example.com</a>
        </p>
        <p className="text-lg text-gray-700 mt-2">
          Phone: (123) 456-7890
        </p>
      </section>
    </div>
  );
};

export default About;
