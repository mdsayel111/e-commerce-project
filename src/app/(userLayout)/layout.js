import Navbar from "@/components/shared/Navbar/Navbar";
import React, { Suspense } from "react";

const userLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default userLayout;
