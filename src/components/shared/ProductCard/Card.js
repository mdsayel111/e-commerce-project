"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import Image from "next/legacy/image";
import useAuth from "@/Hooks/useAuth";
import { usePathname } from "next/navigation";
import UserPageCardBtn from "./UserPageCardBtn";
import AdminPageCardBtn from "./AdminPageCardBtn";
import "./Card.css";
import ConfirmOrderBtn from "./ConfirmOrderBtn";

const MultiActionAreaCard = ({ item }) => {
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
        {path === "/products" ? (
          <UserPageCardBtn item={item} />
        ) : (
          <AdminPageCardBtn item={item} />
        )}
      </CardActionArea>
      ( )
    </Card>
  );
};

export default MultiActionAreaCard;
