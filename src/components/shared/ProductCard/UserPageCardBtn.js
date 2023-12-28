"use client";
import useAuth from "@/Hooks/useAuth";
import { CardActions } from "@mui/material";

import toast from "react-hot-toast";

const UserPageCardBtn = ({ item }) => {
  const { user, setCart } = useAuth();

  const handleCart = (item) => {
    const cartInLocal = window.localStorage.getItem("cart");

    // add product in cart and save local storage
    if (cartInLocal) {
      const cart = JSON.parse(cartInLocal);
      if (cart?.find((obj) => obj._id === item._id)) {
        toast.error("Product in cart");
      } else {
        cart.push(item);
        setCart(cart);
        window.localStorage.setItem("cart", JSON.stringify(cart));
        toast.success("Successful to add cart");
      }
    } else {
      const cart = JSON.stringify([item]);
      setCart([item]);
      window.localStorage.setItem("cart", cart);
      toast.success("Successful to add cart");
    }
  };
  return (
    <CardActions sx={{ width: "100%" }}>
      <span
        onClick={() => handleCart(item)}
        size="small"
        className="btn bg-black text-white py-1 px-4 text-center rounded-lg w-full block"
      >
        ADD TO CART
      </span>
    </CardActions>
  );
};

export default UserPageCardBtn;
