import { CircularProgress } from "@mui/material";
import React from "react";

const loading = () => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <CircularProgress sx={{ color: "black" }} size={60} />
    </div>
  );
};

export default loading;
