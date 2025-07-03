import React from "react";
import BangladeshMap from "./BangladeshMap";
import { useLoaderData } from "react-router";
import { Helmet } from "@dr.pogodin/react-helmet";

const Coverage = () => {
  const serviceCenters = useLoaderData();
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Helmet>
        <title>Coverage - QuickDrop Courier</title>
        <meta name="description" content=" QuickDrop Courier Coverage Page" />
      </Helmet>
      <h1 className="text-3xl font-bold text-center mb-6">
        We are available in 64 districts
      </h1>

      {/* Later you can add your search box here */}
      {/* <SearchDistrictBox /> */}

      <BangladeshMap serviceCenters={serviceCenters} />
    </div>
  );
};

export default Coverage;
