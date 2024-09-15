"use client";

import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useComponentLoader from "@/Hooks/useComponentLoader";
import { CardActions } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const AdminPageCardBtn = ({ item }) => {
  const [loading, setLoading] = useState(false)

  // get loader component by hook
  const loader = useComponentLoader()

  const router = useRouter();
  const axiosSecure = useAxiosSecure();
  const handleDelete = async (item) => {
    setLoading(true)
    await axiosSecure.delete(`/api/admin/product?id=${item._id}`);
    toast.success("Product delete successful");
    router.refresh();
    setLoading(false)
  };
  return (
    <div>
      <CardActions
        sx={{
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <Link
          href={`/admin/dashboard/update-product?id=${item?._id}`}
          size="small"
          className="btn bg-black text-white py-1 px-4 text-center rounded-lg w-full block"
        >
          Update Product
        </Link>
        <span
          onClick={() => handleDelete(item)}
          size="small"
          className="btn ml-0 bg-black text-white py-1 px-4 text-center rounded-lg w-full block"
        >
          {loading ? loader : "Delete Product"}
        </span>
      </CardActions>
    </div>
  );
};

export default AdminPageCardBtn;
