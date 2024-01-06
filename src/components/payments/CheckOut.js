"use client";

import React, { useState } from "react";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import useAuth from "@/Hooks/useAuth";
import { useRouter } from "next/navigation";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51OEV5zDsoBM3ry43gjBBY7QNcBJfRrNZrlI2QSR7iEqKi4ghfcMWpkNO6sbY3qEJn8ABnucpU9keroEdpuXquY3V00e7y3B82A"
);

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, user, setCart } = useAuth();
  const router = useRouter();
  const axiosSecure = useAxiosSecure();

  const [errorMessage, setErrorMessage] = useState(null);

  const afterPayment = async () => {
    const order = {
      email: user?.email,
      cart: cart,
      status: "pending",
    };
    await axiosSecure.post("/api/order", order);
    router.push("/cart");
    toast.success("Your order placed");
    setCart([]);
    window.localStorage.removeItem("cart");
    window.localStorage.removeItem("order");
    await axios.post("/api/sendmail", {
      userEmail: order.email,
      subject: "Order placed",
      massage: "Your order placed successful",
    });
  };

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      afterPayment();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div className="w-fit mx-auto mt-4 bg-black text-white px-4 py-[4px] rounded-xl">
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </div>
    </form>
  );
};

const CheckOut = () => {
  return (
    <div className="lg:w-[50%] w-full mx-auto mt-10">
      <Elements stripe={stripePromise}>
        <CheckOutForm />
      </Elements>
    </div>
  );
};

export default CheckOut;
