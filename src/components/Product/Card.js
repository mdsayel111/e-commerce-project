"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Image from "next/legacy/image";

export default function MultiActionAreaCard({ item }) {
  return (
    <Card sx={{ maxWidth: 300, height: "100%" }}>
      <CardActionArea>
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
            flexDirection: "column"
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
          </CardActions>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
