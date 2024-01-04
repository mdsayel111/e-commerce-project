import { getSingleProducts } from "@/Utils/Fetch";
import UpdateProductForm from "@/components/UpdateProduct/UpdateProductFom";
import axios from "axios";
import React from "react";

const page = async ({ searchParams }) => {
  const res = await getSingleProducts(searchParams.id);
  const data = JSON.parse(JSON.stringify(res));

  return (
    <div className="w-fit mx-auto">
      <UpdateProductForm item={data} />
    </div>
  );
};

export default page;
