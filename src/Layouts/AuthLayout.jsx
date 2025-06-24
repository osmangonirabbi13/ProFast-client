import React from "react";
import { Outlet } from "react-router";
import authImg from "../assets/authImage.png";
import ProFastLogo from "../pages/shared/ProFastLogo/ProFastLogo";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const AuthLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Image Section - Always Visible */}
        <div className="w-full lg:w-1/2 bg-[#FAFDF0] flex items-center justify-center p-6">
          <img
            src={authImg}
            alt="Auth Illustration"
            className="w-full max-w-md"
          />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="mb-6 text-left">
              <ProFastLogo />
            </div>

            {/* Form Content */}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
