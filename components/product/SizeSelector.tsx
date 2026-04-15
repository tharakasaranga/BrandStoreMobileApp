import { ProductSize } from "@/types";

type SizeSelectorProps = {
  sizes: ProductSize[];
  selectedSize: ProductSize;
  onChange: (size: ProductSize) => void;
};

export default function SizeSelector({
  sizes,
  selectedSize,
  onChange,
}: SizeSelectorProps) {
  return (
    <div className="mt-4 flex items-center justify-between gap-2">
      {sizes.map((size) => {
        const active = size === selectedSize;

        return (
          <button
            key={size}
            type="button"
            onClick={() => onChange(size)}
            className={`flex h-11 min-w-11 items-center justify-center rounded-[12px] px-3 text-[16px] font-medium transition ${
              active
                ? "bg-black text-white"
                : "bg-transparent text-[#8c8c8c]"
            }`}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}