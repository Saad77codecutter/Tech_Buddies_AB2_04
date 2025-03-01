import React from "react";

const About = () => {
  return (
    <div className="container mx-auto px-4">
      {/* About Us Section */}
      <section className="py-12 bg-white rounded-lg shadow-md my-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
        <p className="text-lg text-gray-600 mb-6">
          Deepfake Detector was developed with a mission to empower organizations and individuals to identify digital manipulation and protect themselves from social engineering attacks.
        </p>
        <p className="text-lg text-gray-600">
          Our team consists of cybersecurity experts, data scientists, and engineers passionate about building secure and reliable detection systems.
        </p>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-white rounded-lg shadow-md my-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h2>
        <p className="text-lg text-gray-600 mb-4">
          For inquiries, support, or feedback, please reach out via email or follow us on our social media channels.
        </p>
        <p className="text-lg text-blue-500 font-semibold">
          <a href="mailto:support@example.com">support@example.com</a>
        </p>
        <p className="text-lg text-gray-600 mt-2">
          Phone: (123) 456-7890
        </p>
      </section>
    </div>
  );
};

export default About;