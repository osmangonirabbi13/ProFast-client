import React from "react";

const ServiceCard = ({ service }) => {
  const { icon: Icon, title, description } = service;
  return (
    <div className="bg-white hover:bg-[#CAEB66] shadow-md rounded-2xl p-6 border hover:shadow-lg transition-all duration-300">
      <div className="text-4xl text-primary mb-4 flex justify-center items-center">
        <Icon />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-black text-center">
        {title}
      </h3>
      <p className="text-[#606060] text-center">{description}</p>
    </div>
  );
};

export default ServiceCard;
