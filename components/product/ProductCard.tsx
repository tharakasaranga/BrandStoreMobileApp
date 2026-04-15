import Image from "next/image";

type ProductCardProps = {
  title: string;
  price: string;
  imageSrc: string;
  imageClassName?: string;
};

export default function ProductCard({
  title,
  price,
  imageSrc,
  imageClassName = "",
}: ProductCardProps) {
  return (
    <div>
      <div
        className={`relative w-full overflow-hidden rounded-[18px] bg-[#efe7db] ${imageClassName}`}
      >
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 200px"
        />

        <button className="absolute bottom-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white text-[14px] shadow-sm">
          +
        </button>
      </div>

      <div className="mt-2">
        <p className="text-[22px] font-semibold leading-none text-black">
          {price}
        </p>
        <p className="mt-1 text-[15px] leading-none text-[#7c7c7c]">
          {title}
        </p>
      </div>
    </div>
  );
}