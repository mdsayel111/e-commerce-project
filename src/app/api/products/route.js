import { productCollection } from "@/Utils/MongoDB";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const string = searchParams.get("search");
  console.log(string);
  const data = [];

  return NextResponse.json({ data: data });
}
