"use client";

import useAuth from "@/Hooks/useAuth";
import React, { useEffect, useState } from "react";
import Cart from "./Cart";
import { Button } from "@mui/base";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import useAxiosSecure from "@/Hooks/useAxiosSecure";

const CartPage = () => {
  const { cart, user, setCart } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(
    searchParams.get("complete")
  );

  const confirmOrder = async () => {
    try {
      setLoading(true);
      const order = {
        email: user?.email,
        cart: cart,
        status: "pending",
      };
      window.localStorage.setItem("order", JSON.stringify(order));
      router.push("/payment");
    } catch (err) {}
  };

  // useEffect(() => {
  //   return () => {
  //     afterPayment();
  //   };
  // }, []);

  return (
    <>
      {false ? (
        loading
      ) : (
        <div className="mt-10 flex gap-8 flex-col md:flex-row">
          <div className="w-full lg:w-[70%] flex flex-col gap-4">
            {cart?.length > 0 ? (
              cart.map((item) => <Cart key={item._id} item={item} />)
            ) : (
              <div className="flex justify-center items-center min-h-[60vh] w-full text-3xl">
                No item added
              </div>
            )}
          </div>
          <div className="w-full lg:w-[30%] flex gap-4 flex-col p-8 sticky top-0 h-fit">
            <p>Item : {cart?.length}</p>
            <h6 className="text-lg">
              Total Price : ${" "}
              {cart
                ?.reduce((accumulator, item) => accumulator + item.price, 0)
                .toFixed(2)}
            </h6>
            <Button
              disabled={!cart?.length}
              type="button"
              variant="contained"
              style={{
                backgroundColor: "black",
                color: "white",
                padding: "4px 8px",
                borderRadius: "6px",
              }}
              onClick={confirmOrder}
              className="disabled:opacity-[0.6] !disabled:bg-gray-700"
            >
              {/* {loading ? loader : "Sign In"} */}
              confirm cart
            </Button>
          </div>
        </div>
        // <h1>cart</h1>
      )}
    </>
  );
};

export default CartPage;
