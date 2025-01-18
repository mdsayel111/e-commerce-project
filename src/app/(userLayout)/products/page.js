import MultiActionAreaCard from "@/components/shared/ProductCard/Card";
import { getProductsPageData } from "@/Utils/Fetch";

const page = async ({ searchParams }) => {
  const res = await getProductsPageData(searchParams.search);
  const { products } = res || {};
  return (
    <div className="grid lg:grid-cols-5 w-fit mx-auto gap-6 mt-8 grid-cols-1 md:grid-cols-3">
      {products?.map((item) => (
        <MultiActionAreaCard key={item._id} item={item} />
      ))}
    </div>
  );
};

export default page;
