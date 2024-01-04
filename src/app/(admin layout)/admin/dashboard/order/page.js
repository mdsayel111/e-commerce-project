import { getOrdrs } from "@/Utils/Fetch";
import OrderCard from "@/components/Order/OrderCard";

const page = async () => {
  const data = await getOrdrs();
  return (
    <div className="lg:w-full mx-6">
      {data?.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  );
};

export default page;
