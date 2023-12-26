import axios from "axios";
import Card from "@/components/Product/Card";

const page = async () => {
  const res = await axios.get("http://localhost:3000/api/products");
  const data = res.data.data;
  return (
    <div className="grid lg:grid-cols-5 w-fit mx-auto gap-6 mt-8 grid-cols-1 md:grid-cols-3">
      {data.map((item) => (
        <Card key={item._id} item={item} />
      ))}
    </div>
  );
};

export default page;
