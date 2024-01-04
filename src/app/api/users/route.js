import { userCollection } from "@/Utils/MongoDB";
import { NextResponse } from "next/server";

export async function POST(req) {
  const userInfo = await req.json();
  const result = await userCollection.insertOne(userInfo);
  return NextResponse.json(result);
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const result = await userCollection.findOne({ email });
  return NextResponse.json(result);
}
