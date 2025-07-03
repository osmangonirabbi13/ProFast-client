import React from "react";
import Banner from "../Banner/Banner";
import Services from "../Services/Services";
import ClientLogosMarquee from "../ClientLogosMarquee/ClientLogosMarquee";
import Benefits from "../Benefits/Benefits";
import BeMerchant from "../BeMerchant/BeMerchant";
import HowItWorks from "../Works/Works";
import { Helmet } from "@dr.pogodin/react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home - QuickDrop Courier</title>
        <meta name="description" content=" QuickDrop Courier Home Page" />
      </Helmet>
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
