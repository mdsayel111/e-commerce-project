"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import Image from "next/legacy/image";
import useAuth from "@/Hooks/useAuth";
import toast from "react-hot-toast";
import { set } from "react-hook-form";

export default function MultiActionAreaCard({ item }) {
  const { user, setCart } = useAuth();

  const handleCart = (item) => {
    console.log(item);
    const cartInLocal = window.localStorage.getItem("cart");

    // add product in cart and save local storage
    if (cartInLocal) {
      const cart = JSON.parse(cartInLocal);
      // console.log(cart);
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
    <Card sx={{ maxWidth: 300, height: "100%" }}>
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Image
          src={item.imgUrl}
          alt="image"
          height={300}
          width={300}
          className="object-cover"
        />
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Typography gutterBottom variant="h6" component="div">
            {item.name.length > 20 ? item.name.substring(0, 20) : item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description.length > 50
              ? item.description.substring(0, 50) + "..."
              : item.description}
          </Typography>
        </CardContent>
        <p>{`Price : $ ${item.price}`}</p>
        <CardActions sx={{ width: "100%" }}>
          <span
            onClick={() => handleCart(item)}
            size="small"
            className="btn bg-black text-white py-1 px-4 text-center rounded-lg w-full block"
          >
            ADD TO CART
          </span>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
