import { getOrdrs } from "@/Utils/Fetch";
import OrderCard from "@/components/Order/OrderCard";

const page = async () => {
  const data = await getOrdrs();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 w-fit mx-auto gap-4">
      {data?.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  );
};

export default page;
