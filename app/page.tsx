import Link from "next/link";
import BottomNav from "@/components/ui/BottomNav";
import MobileContainer from "@/components/ui/MobileContainer";
import ProductCard from "@/components/product/ProductCard";

const categories = ["All", "Men", "Women", "Kids", "Other"];

export default function HomePage() {
  return (
    <MobileContainer className="relative">
      <div className="px-6 pb-[110px] pt-9">
        <div className="flex items-center justify-between">
          <button className="grid h-8 w-8 grid-cols-2 grid-rows-2 gap-[3px]">
            <span className="rounded-[3px] border border-black" />
            <span className="rounded-[3px] border border-black" />
            <span className="rounded-[3px] border border-black" />
            <span className="rounded-[3px] border border-black" />
          </button>

          <button className="flex h-8 w-8 items-center justify-center">
            <span className="block h-4 w-4 rounded-full border border-black" />
          </button>
        </div>

        <div className="mt-8">
          <h1 className="text-[25px] font-semibold leading-none text-black">
            Explore
          </h1>
          <p className="mt-2 text-[14px] leading-none text-[#8a8a8a]">
            Best trendy collection!
          </p>
        </div>

        <div className="mt-6 flex items-center gap-6 overflow-x-auto whitespace-nowrap">
          {categories.map((category) => {
            const isActive = category === "All";

            return (
              <button
                key={category}
                className={
                  isActive
                    ? "rounded-full bg-[#ff8a00] px-4 py-2 text-[13px] font-medium text-white"
                    : "text-[14px] font-medium text-black"
                }
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-4">
          <Link href="/details/1">
            <ProductCard
              title="Tagerine Shirt"
              price="$240.32"
              imageSrc="/images/products/product-1.png"
              imageClassName="h-[144px]"
            />
          </Link>

          <Link href="/details/2">
            <ProductCard
              title="Leather Coart"
              price="$325.36"
              imageSrc="/images/products/product-2.png"
              imageClassName="mt-[20px] h-[104px]"
            />
          </Link>

          <Link href="/details/3">
            <ProductCard
              title="Tagerine Shirt"
              price="$126.47"
              imageSrc="/images/products/product-3.png"
              imageClassName="h-[122px]"
            />
          </Link>

          <Link href="/details/4">
            <ProductCard
              title="Leather Coart"
              price="$257.85"
              imageSrc="/images/products/product-4.png"
              imageClassName="h-[144px]"
            />
          </Link>
        </div>
      </div>

      <BottomNav active="home" />
    </MobileContainer>
  );
}
