import { getAllProducts } from "@/Utils/Fetch";
import Slider from "@/components/Home/Slider/Slider";
import MultiActionAreaCard from "@/components/shared/ProductCard/Card";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const res = await getAllProducts("all");
  const data = res.slice(1, 5);
  return (
    <>
      <Slider />
      <div className="mt-20">
        <h1 className="w-fit mx-auto text-2xl font-bold mb-10">
          SHOP BY CHOOICE
        </h1>
        <div id="shop-by-chooise" className="w-[90%] mx-auto relative">
          <div className="gap-4 flex flex-col lg:flex-row">
            <div className="flex w-full lg:w-1/3 h-min flex-row lg:flex-col  gap-4">
              <div className="aspect-square w-full relative ">
                <Image
                  src={"/image/download.jpg"}
                  alt="img"
                  fill
                  className=" object-cover"
                />
              </div>
              <div className="aspect-square w-full relative ">
                <Image
                  src={
                    "/image/Fastrack-Reflex-Nitro-BT-Calling-Smart-Watch-Black-7216.jpg"
                  }
                  alt="img"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="lg:w-2/3 w-full aspect-square lg:h-auto relative">
              <Image
                src={"/image/87600094_010_0.webp"}
                alt="img"
                fill
                className="aspect-square object-cover"
              />
            </div>
          </div>
          <div
            id="shop-now-div"
            className="absolute top-0 hover:flex hidden w-full h-full  justify-center items-center bg-[#00000066] z-10"
          >
            <Link href={"/products?search=all"}>
              <button className="bg-black px-4 py-2 rounded-xl text-white opacity-100">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div>
        <h1 className="w-fit uppercase mt-10 mx-auto text-2xl font-bold mb-10">
          Trending Products
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-fit mx-auto">
          {data?.map((item) => (
            <MultiActionAreaCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}
