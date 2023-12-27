import { productCollection } from "@/Utils/MongoDB";
import { NextResponse } from "next/server";

export async function GET(req) {
  const result = await productCollection.find({}).toArray();

  return NextResponse.json({ data: result });
}
