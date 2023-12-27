import { userCollection } from "@/Utils/MongoDB";
import { NextResponse } from "next/server";
import { json } from "react-router-dom";
const jwt = require("jsonwebtoken");

export async function GET(req, { params }) {
  const token = jwt.sign(
    {
      email: params.email,
    },
    process.env.NEXT_PUBLIC_SECRET
  );

  return new NextResponse(JSON.stringify({ massage: "token" }), {
    status: 200,
    headers: {
      "Set-Cookie": `token=${token}; sameSite=strict; httpOnly=true; maxAge=60*60*24`,
    },
  });
}
