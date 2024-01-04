"use client";

import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { usePathname } from "next/navigation";

const Cart = ({ item }) => {
  const theme = useTheme();
  const path = usePathname();

  return (
    <Card sx={{ display: "inline-flex" }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={item.imgUrl}
        alt="Live from space album cover"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
        }}
      >
        <CardContent sx={{ flex: "1 0 auto", textAlign: "center" }}>
          <Typography component="div" variant="h5">
            {item.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {item.description}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          price : $ {item.price}
        </Box>
      </Box>
    </Card>
  );
};

export default Cart;
