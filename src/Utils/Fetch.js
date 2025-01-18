import { CLIENT_APP_URL } from "@/Apis";
import { ObjectId } from "mongodb";
import { productCollection } from "./MongoDB";

export const getHomePageData = async () => {
  const homepageData = await fetch(CLIENT_APP_URL + "home");
  const res = await homepageData.json();
  return res;
};


export const getProductsPageData = async () => {
  const productsPageData = await fetch(CLIENT_APP_URL + "products");
  const res = await productsPageData.json();
  return res;
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
