import React from "react";
import logo from "../../../assets/logo.png";

const ProFastLogo = () => {
  return (
    <div className="flex items-end">
      <img className="mb-2" src={logo} alt="ProFast Logo" />
      <p className="text-3xl -ml-2 font-extrabold">ProFast</p>
    </div>
  );
};

export default ProFastLogo;
