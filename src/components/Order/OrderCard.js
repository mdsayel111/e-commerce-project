"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, CardActions, CardMedia } from "@mui/material";
import useAuth from "@/Hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import "../shared/ProductCard/Card.css";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import toast from "react-hot-toast";

export default function OrderCard({ order }) {
  const { user, setCart } = useAuth();
  const axiosSecure = useAxiosSecure();
  const router = useRouter();
  const theme = useTheme();
  const path = usePathname();
  const orderItems = order.cart;
  const handleConfirmOrder = async (id) => {
    await axiosSecure.patch(`/api/admin/order?id=${id}`);
    await axios.post("/api/sendmail", {
      userEmail: order.email,
      subject: "Order confirm",
      massage: "Your order confirm",
    });
    toast.success("Order confirm successful");
    router.refresh();
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row-reverse" },
        marginTop: "16px",
        padding: "16px",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent
          sx={{ flex: "1 0 auto", padding: { sm: "0", md: "16px" } }}
        >
          <div>
            #Order: {order._id}
            <h3>Email : {order.email}</h3>
          </div>
        </CardContent>
      </Box>
      <div className="flex gap-2 flex-col">
        <div className="flex gap-2">
          {orderItems?.map((orderItem) => (
            <CardMedia
              key={orderItem._id}
              component="img"
              sx={{ width: 50 }}
              image={orderItem.imgUrl}
              alt="Live from space album cover"
            />
          ))}
        </div>
        <div className="flex items-center">
          <span className="text-xs border-black border-2 px-1 py-[2px] rounded-xl mr-4">
            {order.status}
          </span>
          {order.status === "confirmed" ? (
            ""
          ) : (
            <button
              className="bg-black text-white px-4 py-2 rounded-xl"
              onClick={() => handleConfirmOrder(order._id)}
            >
              Confirm Order
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}
