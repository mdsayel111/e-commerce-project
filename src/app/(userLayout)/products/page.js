import axios from "axios";
import Card from "@/components/shared/ProductCard/Card";
import { getAllProducts } from "@/Utils/Fetch";

const page = async () => {
  const data = await getAllProducts();
  return (
    <div className="grid lg:grid-cols-5 w-fit mx-auto gap-6 mt-8 grid-cols-1 md:grid-cols-3">
      {data.map((item) => (
        <Card key={item._id} item={item} />
      ))}
    </div>
  );
};

export default page;
