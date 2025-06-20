import React from "react";
import Banner from "../Banner/Banner";
import Services from "../Services/Services";
import ClientLogosMarquee from "../ClientLogosMarquee/ClientLogosMarquee";
import Benefits from "../Benefits/Benefits";
import BeMerchant from "../BeMerchant/BeMerchant";
import HowItWorks from "../Works/Works";

const Home = () => {
  return (
    <>
      <Banner />
      <HowItWorks />
      <Services />
      <ClientLogosMarquee />
      <Benefits />
      <BeMerchant />
    </>
  );
};

export default Home;
