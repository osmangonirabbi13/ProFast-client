import React from "react";
import location from "../../../assets/location-merchant.png";

const BeMerchant = () => {
  return (
    <div
      data-aos="zoom-in-up"
      className="bg-[url('assets/be-a-merchant-bg.png')] mx-4 bg-no-repeat bg-[#03373D] rounded-xl p-20 mb-10"
    >
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={location} className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-5xl font-bold text-white">
            Merchant and Customer Satisfaction is Our First Priority
          </h1>
          <p className="py-6 text-white">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>
          <button className="btn bg-[#CAEB66] hover:btn hover:btn-outline hover:rounded-full  text-black rounded-full border-[#CAEB66]">
            Become A Merchant
          </button>
          <button className="btn  text-[#CAEB66] border-[#CAEB66] btn-outline  hover:bg-[#CAEB66] hover:text-black mt-3 lg:mt-0 md:mt-0 md:ms-4  lg:ms-4 rounded-full">
            Earn with Profast Courier
          </button>
        </div>
      </div>
    </div>
  );
};

export default BeMerchant;
