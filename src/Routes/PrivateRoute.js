"use client";

import useAuth from "@/Hooks/useAuth";
import useLoader from "@/Hooks/usePageLoader";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();
  const path = usePathname();
  const Loader = useLoader();

  const privateRoute = ["products", "cart"];

  useEffect(() => {
    console.log("inside useEffect");
    if (!user && privateRoute.includes(path.replace(/^\/|\/$/g, ""))) {
      router.push("/signup-or-signin");
    }
  }, [user, path]);

  return (
    <>
      {!user && privateRoute.includes(path.replace(/^\/|\/$/g, "")) ? (
        <div className="min-h-screen flex justify-center items-center">
          {Loader}
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default PrivateRoute;
