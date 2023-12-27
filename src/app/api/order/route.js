import { userCollection } from "@/Utils/MongoDB";
import { NextResponse } from "next/server";

export async function POST(req) {
  const userInfo = await req.json();
  const result = await userCollection.insertOne(userInfo);
  return NextResponse.json(result)
}