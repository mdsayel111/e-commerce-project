"use client";

import Lottie from "lottie-react";
import React from "react";
import Loading from "@/assets/animation/Loading.json";

const useLoader = () => {
  return (
    <div
      style={{
        width: "40px",
        height: "fit-content",
      }}
    >
      <Lottie animationData={Loading} loop={true} />
    </div>
  );
};

export default useLoader;
