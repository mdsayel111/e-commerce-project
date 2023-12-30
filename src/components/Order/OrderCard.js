"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import useAuth from "@/Hooks/useAuth";
import { usePathname } from "next/navigation";
import "../shared/ProductCard/Card.css";

export default function OrderCard({ order }) {
  const { user, setCart } = useAuth();
  const path = usePathname();

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
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Typography
            sx={{ fontSize: "16px" }}
            gutterBottom
            variant="p"
            component="div"
          >
            Email: {order?.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Item: {order?.cart?.length}
          </Typography>
        </CardContent>
        {/* <p>{`Price : $ ${item.price}`}</p> */}
      </CardActionArea>
    </Card>
  );
}
