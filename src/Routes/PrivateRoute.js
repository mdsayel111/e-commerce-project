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
    if (!user && privateRoute.includes(path.replace(/^\/|\/$/g, ""))) {
      router.push("/signup-or-signin");
    }
  }, [user]);

  return (
    <>
      {!user && privateRoute.includes(path.replace(/^\/|\/$/g, "")) ? (
        <div className="flex h-screen justify-center items-center">
          {Loader}
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default PrivateRoute;
