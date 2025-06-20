import React from "react";
import Banner from "../Banner/Banner";
import Services from "../Services/Services";
import ClientLogosMarquee from "../ClientLogosMarquee/ClientLogosMarquee";
import Benefits from "../Benefits/Benefits";

const Home = () => {
  return (
    <>
      <Banner />
      <Services />
      <ClientLogosMarquee />
      <Benefits />
    </>
  );
};

export default Home;
