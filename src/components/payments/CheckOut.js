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
  const [amount, setAmount] = useState(
    cart?.reduce((accumulator, item) => accumulator + item.price, 0).toFixed(2)
  );

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
    event.preventDefault();

    console.log("insde handle submit");

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

    // Create the PaymentIntent and obtain clientSecret from your server endpoint
    const res = await axios.post("/api/create-intent", { amount: amount });
    console.log(res);

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
      <button className="bg-black text-white px-3 py-1 rounded-xl mt-8 mx-auto block" type="submit" disabled={!stripe || !elements}>
        Pay
      </button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

const CheckOut = () => {
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
  return (
    <div className="lg:w-[50%] w-full mx-auto mt-10">
      <Elements stripe={stripePromise} options={options}>
        <CheckOutForm />
      </Elements>
    </div>
  );
};

export default CheckOut;
