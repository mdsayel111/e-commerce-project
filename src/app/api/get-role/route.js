import { userCollection } from "@/Utils/MongoDB";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const user = await userCollection.findOne({ email });
  return NextResponse.json({ role: user.role });
}
