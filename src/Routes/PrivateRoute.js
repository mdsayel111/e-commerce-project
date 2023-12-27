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

  //   console.log(privateRoute.includes(path));
  //   console.log(path.replace(/^\/|\/$/g, ""));
  //   console.log(privateRoute.includes(path.replace(/^\/|\/$/g, "")));

  useEffect(() => {
    if (!user && privateRoute.includes(path.replace(/^\/|\/$/g, ""))) {
      router.push("/signup-or-signin");
    }
  }, [path]);

  return (
    <>
      {!user && privateRoute.includes(path.replace(/^\/|\/$/g, ""))
        ? Loader
        : children}
    </>
  );
};

export default PrivateRoute;
