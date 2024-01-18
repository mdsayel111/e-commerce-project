import { orderCollection, userCollection } from "@/Utils/MongoDB";
import { VerifyToken } from "@/Utils/Utils";
import { NextResponse } from "next/server";

export async function POST(req) {
  if (await VerifyToken(req)) {
    const orderInfo = await req.json();
    const result = await orderCollection.insertOne(orderInfo);
    return NextResponse.json(result);
  }
  return Response.json(
    { message: "Unathorized" },
    {
      status: 401,
    }
  );
}
