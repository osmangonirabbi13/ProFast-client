import {
  FaShippingFast,
  FaMoneyBillWave,
  FaWarehouse,
  FaBuilding,
} from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      title: "Booking Pick & Drop",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
      icon: <FaShippingFast size={32} className="text-teal-800 mb-4" />,
    },
    {
      title: "Cash On Delivery",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
      icon: <FaMoneyBillWave size={32} className="text-teal-800 mb-4" />,
    },
    {
      title: "Delivery Hub",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
      icon: <FaWarehouse size={32} className="text-teal-800 mb-4" />,
    },
    {
      title: "Booking SME & Corporate",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
      icon: <FaBuilding size={32} className="text-teal-800 mb-4" />,
    },
  ];

  return (
    <section className=" py-12 px-4 md:px-16">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">
        How it Works
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm flex flex-col items-start text-gray-700"
          >
            {step.icon}
            <h3 className="font-semibold text-base text-gray-800 mb-2">
              {step.title}
            </h3>
            <p className="text-sm text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
