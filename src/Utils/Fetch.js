import { ObjectId } from "mongodb";
import { orderCollection, productCollection } from "./MongoDB";
import { CLIENT_APP_URL } from "@/Apis";

export const getAllProducts = async (searchString) => {
  // let result = [];

  // if (searchString === "all") {
  //   result = await productCollection.find({}).toArray();
  // } else {
  //   result = await productCollection
  //     .find({
  //       name: { $regex: new RegExp(searchString, "i") },
  //     })
  //     .toArray();
  // }

  // return JSON.parse(JSON.stringify(result));

  const products = await fetch(CLIENT_APP_URL + "home");
  const res = await products.json();
  return res?.data;
};

export const getSingleProducts = async (id) => {
  const result = await productCollection.findOne({
    _id: new ObjectId(id),
  });
  return result;
};

export const getOrdrs = async (id) => {
  // 
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/order`, {
    cache: "no-store"
  });
  return await res.json();
};
