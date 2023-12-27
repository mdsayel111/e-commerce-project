"use client";

import React from "react";
import { CircularProgress } from "@mui/material";

const useLoader = () => {
  return (
    <div
      style={{
        width: "40px",
        height: "fit-content",
      }}
    >
      <CircularProgress sx={{ color: "black" }} size={60} />
    </div>
  );
};

export default useLoader;
