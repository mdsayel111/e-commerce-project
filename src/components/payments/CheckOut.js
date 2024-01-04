"use client";

import React, { useState } from "react";
import {
  CardElement,
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import useAuth from "@/Hooks/useAuth";

const stripePromise = loadStripe(
  "pk_test_51OEV5zDsoBM3ry43gjBBY7QNcBJfRrNZrlI2QSR7iEqKi4ghfcMWpkNO6sbY3qEJn8ABnucpU9keroEdpuXquY3V00e7y3B82A"
);
const options = {
  mode: "payment",
  amount: 1099,
  currency: "usd",
  // Fully customizable with appearance API.
  appearance: {
    /*...*/
  },
};

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, user, setCart } = useAuth();

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      return;
    }

    const amount = parseFloat(
      parseFloat(
        cart.reduce((accumulator, item) => accumulator + item.price, 0)
      ).toFixed(2)
    );

    const order = {
      email: user?.email,
      cart: cart,
      status: "pending",
    };

    // Create the PaymentIntent and obtain clientSecret from your server endpoint
    // fetch("/api/create-intent");
    const res = await axios.post("/api/create-intent", { amount: amount });
    const { client_secret: clientSecret } = await res.data;

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      clientSecret,
      confirmParams: {
        return_url: "http://localhost:3000/cart?complete=true",
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      console.log(error);
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || !elements}
        className="bg-black text-white px-6 py-1 rounded-xl mt-4 w-fit block mx-auto"
      >
        Pay
      </button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

const CheckOut = () => {
  return (
    <div className="lg:w-[50%] w-full mx-auto mt-10">
      <Elements stripe={stripePromise} options={options}>
        <CheckOutForm />
      </Elements>
    </div>
  );
};

export default CheckOut;
