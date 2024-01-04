import { orderCollection } from "@/Utils/MongoDB";
import { VerifyAdmin, VerifyToken } from "@/Utils/Utils";
import { ObjectId } from "mongodb";

export async function PATCH(req) {
  if ((await VerifyToken(req)) && (await VerifyAdmin(req))) {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("id");
    const updateDoc = {
      $set: {
        status: "confirmed",
      },
    };
    const result = await orderCollection.updateOne(
      {
        _id: new ObjectId(orderId),
      },
      updateDoc
    );
    return NextResponse.json({ massage: "Order confirm successfull" });
  }
  return Response.json(
    { message: "Unathorized" },
    {
      status: 401,
    }
  );
}
