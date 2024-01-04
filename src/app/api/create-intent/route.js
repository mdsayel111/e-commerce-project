import { NextResponse } from "next/server";

const stripe = require("stripe")(
  "sk_test_51OEV5zDsoBM3ry43CA7u3xs0Mh2ij3QaWJqalFwpu43zbwEivIQukSrsMdokuGofnlmVYnUysHOAEexTIWdT3YKs00mSKAmvoS"
);

export async function POST(req) {
  const { amount } = await req.json();
  const { client_secret } = await stripe.paymentIntents.create({
    amount: parseInt(amount * 100),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  return NextResponse.json({ client_secret });
}
