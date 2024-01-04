"use client";

import Link from "next/link";
import Logo from "../shared/Navbar/Logo";
import { CiMenuBurger } from "react-icons/ci";
import { useState } from "react";

const AdminNavbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="lg:w-[20%] w-full z-20">
      <div className="hidden sticky top-0 lg:flex pt-20 text-center gap-8 flex-col p-8 text-xl bg-black text-white min-h-screen">
        <Link href={"/"}>Home</Link>
        <Link href={"/admin/dashboard/all-product"}>All product</Link>
        <Link href={"/admin/dashboard/add-product"}>Add product</Link>
        <Link href={"/admin/dashboard/order"}>Order</Link>
      </div>
      <div className="flex lg:hidden w-[90%] mx-auto justify-between items-center">
        <Logo />
        <div className="relative">
          <CiMenuBurger
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="text-3xl"
          />
          <ul
            className="absolute top-6 bg-gray-50 rounded-lg right-0 p-8 space-y-2 font-semibold w-[162px] text-center"
            style={{ display: `${isModalOpen ? "Block" : "none"}` }}
          >
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/admin/dashboard/all-product"}>All product</Link>
            </li>
            <li>
              <Link href={"/admin/dashboard/add-product"}>Add product</Link>
            </li>
            <li>
              <Link href={"/admin/dashboard/order"}>Order</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
