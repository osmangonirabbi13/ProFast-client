import React from "react";
import logo from "../../../assets/logo.png";

const ProFastLogo = () => {
  return (
    <div className="flex items-center gap-3">
      <img className="mb-2 w-16 h-16" src={logo} alt="ProFast Logo" />
      <p className="text-3xl -ml-2 font-extrabold">QuickDrop</p>
    </div>
  );
};

export default ProFastLogo;
