"use client";

import React from "react";
import { CircularProgress } from "@mui/material";

const useComponentLoader = () => {
  return (
    <div>
      <CircularProgress sx={{ color: "white" }} size={15}/>
    </div>
  );
};

export default useComponentLoader;
