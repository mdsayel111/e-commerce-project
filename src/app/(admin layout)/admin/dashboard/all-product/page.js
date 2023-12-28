import axios from "axios";
import MultiActionAreaCard from "@/components/shared/ProductCard/Card";

const page = async () => {
  const res = await axios.get("http://localhost:3000/api/products");
  const data = res.data.data;
  return (
    <div className="grid lg:grid-cols-5 w-fit mx-auto gap-6 mt-8 grid-cols-1 md:grid-cols-3">
      {data?.map((item) => (
        <MultiActionAreaCard key={item._key} item={item} />
      ))}
    </div>
  );
};

export default page;
