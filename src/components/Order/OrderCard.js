"use client";

import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { Box, CardMedia } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import "../shared/ProductCard/Card.css";
import { useState } from "react";
import useComponentLoader from "@/Hooks/useComponentLoader";

export default function OrderCard({ order }) {
  const [loading, setLoading] = useState(false)
  const axiosSecure = useAxiosSecure();
  const router = useRouter();
  // get loader by hook
  const loader = useComponentLoader()

  const orderItems = order.cart;
  const handleConfirmOrder = async (id) => {
    setLoading(true)
    await axiosSecure.patch(`/api/admin/order?id=${id}`);
    await axios.post("/api/sendmail", {
      userEmail: order.email,
      subject: "Order confirm",
      massage: "Your order confirm",
    });
    toast.success("Order confirm successful");
    router.refresh()
    setLoading(false)
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
              sx={{ width: 50, height: 50 }}
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
              {loading ? loader : "Confirm Order"}
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}
