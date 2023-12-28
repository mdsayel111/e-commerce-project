import { productCollection } from "@/Utils/MongoDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  const product = await req.json();
  const result = await productCollection.insertOne(product);
  return NextResponse.json({ massage: "product add successful" });
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const result = await productCollection.deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ massage: "product delete successful" });
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const result = await productCollection.findOne({ _id: new ObjectId(id) });
  return NextResponse.json({ result });
}

export async function PATCH(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const updateProduct = await req.json();
  const updatedDoc = {
    $set: {
      ...updateProduct,
    },
  };
  const result = await productCollection.updateOne(
    { _id: new ObjectId(id) },
    updatedDoc
  );
  return NextResponse.json({ result });
}
