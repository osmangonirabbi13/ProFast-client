import { Helmet } from "@dr.pogodin/react-helmet";
import React from "react";

const AboutUs = () => {
  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-lg shadow-md my-12">
      <Helmet>
        <title>About Us - QuickDrop Courier</title>
        <meta name="description" content="About us Page" />
      </Helmet>
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        About Us
      </h1>

      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        Welcome to QuickDrop Parcel Delivery! We are dedicated to providing
        fast, reliable, and affordable parcel delivery services across the
        region. Our mission is to connect people and businesses through
        efficient logistics solutions.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Story</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Founded in 2025, QuickDrop started as a small startup aiming to simplify
        parcel delivery for everyone. Through innovative technology and a
        passionate team, we have grown into a trusted delivery partner for
        thousands of customers.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        What We Offer
      </h2>
      <ul className="list-disc list-inside text-gray-700 mb-6">
        <li>Fast and secure parcel delivery services</li>
        <li>Real-time parcel tracking</li>
        <li>Wide coverage area including urban and rural locations</li>
        <li>Friendly and professional riders</li>
        <li>Customer support available 24/7</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Team</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Our team is made up of dedicated logistics experts, customer support
        professionals, and tech innovators committed to ensuring your parcels
        reach their destination safely and on time.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contact Us</h2>
      <p className="text-gray-700 leading-relaxed">
        Have questions or need assistance? Reach out to us anytime at{" "}
        <a
          href="mailto:osmanrabbi89@gmail.com
"
          className="text-blue-600 underline"
        >
          osmanrabbi89@gmail.com
        </a>{" "}
        or call us at <strong>+880 234 567 890</strong>.
      </p>
    </div>
  );
};

export default AboutUs;
