import React from "react";
import useUserRole from "../../../Hooks/useUserRole";
import Loading from "../../../Components/Loading";
import UserDashboard from "./UserDashboard";
import RiderDashboard from "./RiderDashboard";
import AdminDashboard from "./AdminDashboard";
import Forbidden from "../../Forbidden/Forbidden";
import { Helmet } from "@dr.pogodin/react-helmet";

const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading) {
    return <Loading />;
  }

  let content;

  if (role === "user") {
    content = <UserDashboard />;
  } else if (role === "rider") {
    content = <RiderDashboard />;
  } else if (role === "admin") {
    content = <AdminDashboard />;
  } else {
    content = <Forbidden />;
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - QuickDrop Courier</title>
        <meta name="description" content="QuickDrop Courier Dashboard" />
      </Helmet>
      {content}
    </>
  );
};

export default DashboardHome;
