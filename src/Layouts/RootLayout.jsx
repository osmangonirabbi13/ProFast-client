import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";
import useAuth from "../hooks/useAuth";
import Loading from "../Pages/Loading/Loading";

const RootLayout = () => {
  const { loading } = useAuth();

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <Navbar />

      <div className="min-h-[calc(100vh-116px)] max-w-7xl mx-auto ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
