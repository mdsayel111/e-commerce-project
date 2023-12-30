import { getSingleProducts } from "@/Utils/Fetch";
import UpdateProductForm from "@/components/UpdateProduct/UpdateProductFom";
import axios from "axios";
import React from "react";

const page = async ({ searchParams }) => {
  const data = await getSingleProducts(searchParams.id);
  console.log(data);
  return (
    <div className="w-fit mx-auto">
      <UpdateProductForm item={data} />
    </div>
  );
};

export default page;
