import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
const Payment = () => {
  const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm></PaymentForm>
    </Elements>
  );
};

export default Payment;
