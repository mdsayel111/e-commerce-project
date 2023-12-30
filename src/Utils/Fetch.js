import { ObjectId } from "mongodb";
import { productCollection } from "./MongoDB";

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
