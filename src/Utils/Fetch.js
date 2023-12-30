import { ObjectId } from "mongodb";
import { orderCollection, productCollection } from "./MongoDB";

export const getAllProducts = async () => {
  const result = await productCollection.find({}).toArray();
  return result;
};

export const getSingleProducts = async (id) => {
  const result = await productCollection.findOne({
    _id: new ObjectId(id),
  });
  return result;
};

export const getOrdrs = async (id) => {
  const result = await orderCollection.find({}).toArray();
  return result;
};
