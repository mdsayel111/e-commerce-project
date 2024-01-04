import { userCollection } from "@/Utils/MongoDB";
import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");

export async function GET(req, { params }) {
  const token = jwt.sign(
    {
      email: params.email,
    },
    process.env.NEXT_PUBLIC_SECRET,
    {
      expiresIn: "7d", // 7 days
    }
  );

  return NextResponse.json({ token: token });

  // return new NextResponse(JSON.stringify({ massage: "token" }), {
  //   status: 200,
  //   headers: {
  //     "Set-Cookie": `token=${token}; sameSite=true; secure; httpOnly=true; maxAge=60*60*24; Path=${"/"}`,
  //   },
  // });
}
