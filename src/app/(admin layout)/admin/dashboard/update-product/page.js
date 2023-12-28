import UpdateProductForm from "@/components/UpdateProduct/UpdateProductFom";
import axios from "axios";
import React from "react";

const page = async ({ searchParams }) => {
  const res = await axios.get(
    `http://localhost:3000/api/admin/product?id=${searchParams.id}`
  );
  const data = res.data.result;
  return (
    <div className="w-fit mx-auto">
      <UpdateProductForm item={data} />
    </div>
  );
};

export default page;
