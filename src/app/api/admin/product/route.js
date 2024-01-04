import { productCollection } from "@/Utils/MongoDB";
import { VerifyAdmin, VerifyToken } from "@/Utils/Utils";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  if ((await VerifyToken(req)) && (await VerifyAdmin(req))) {
    const product = await req.json();
    const result = await productCollection.insertOne(product);
    return NextResponse.json({ massage: "product add successful" });
  }
  return Response.json(
    { message: "Unathorized" },
    {
      status: 401,
    }
  );
}

export async function DELETE(req) {
  if ((await VerifyToken(req)) && (await VerifyAdmin(req))) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const result = await productCollection.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ massage: "product delete successful" });
  }
  return Response.json(
    { message: "Unathorized" },
    {
      status: 401,
    }
  );
}

export async function PATCH(req) {
  if ((await VerifyToken(req)) && (await VerifyAdmin(req))) {
    console.log(VerifyToken(req), VerifyAdmin(req));
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
    return NextResponse.json({ massage: "success" });
  }
  return Response.json(
    { message: "Unathorized" },
    {
      status: 401,
    }
  );
}
