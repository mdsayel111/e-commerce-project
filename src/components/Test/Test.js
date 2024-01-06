"use client";

import { useEffect, useState } from "react";

const Test = () => {
  console.log("component mount");

  useEffect(() => {
    // afterPayment();
    return () => {
      console.log("unmount");
    };
  }, []);

  return <div>test</div>;
};

export default Test;
