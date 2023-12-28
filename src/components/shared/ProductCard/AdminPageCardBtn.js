"use client";

import { CardActions } from "@mui/material";
import toast from "react-hot-toast";
import { set } from "react-hook-form";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AdminPageCardBtn = ({ item }) => {
  const router = useRouter();
  const handleDelete = async (item) => {
    await axios.delete(`/api/admin/product?id=${item._id}`);
    toast.success("Product delete successful");
    router.refresh();
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
          Delete Product
        </span>
      </CardActions>
    </div>
  );
};

export default AdminPageCardBtn;
