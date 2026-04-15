import Image from "next/image";
import { Heart, Trash2 } from "lucide-react";

type CartItemProps = {
  imageSrc: string;
  title: string;
  color: string;
  size: string;
  price: string;
  quantity: number;
  showActions?: boolean;
  onDelete?: () => void;
};

export default function CartItem({
  imageSrc,
  title,
  color,
  size,
  price,
  quantity,
  showActions = false,
  onDelete,
}: CartItemProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <div className="relative h-[96px] w-[80px] shrink-0 overflow-hidden rounded-[16px] bg-[#efe7db]">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>

        <div className="min-w-0">
          <h3 className="text-[18px] font-semibold leading-[1.05] text-black">
            {title}
          </h3>

          <div className="mt-2 space-y-1">
            <p className="text-[14px] leading-none text-[#a3a3a3]">{color}</p>
            <p className="text-[14px] leading-none text-[#a3a3a3]">{size}</p>
          </div>

          <p className="mt-4 text-[18px] font-semibold leading-none text-black">
            {price}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        {showActions && (
          <div className="flex h-[48px] w-[96px] items-center justify-center gap-4 rounded-l-full rounded-r-[4px] bg-[#ff8a00] text-white">
            <button
              type="button"
              aria-label="Add to favorites"
              className="transition hover:opacity-80"
            >
              <Heart size={16} strokeWidth={2.2} />
            </button>

            <button
              type="button"
              aria-label="Delete item"
              onClick={onDelete}
              className="transition hover:opacity-80"
            >
              <Trash2 size={16} strokeWidth={2.2} />
            </button>
          </div>
        )}

        {!showActions && onDelete && (
          <button
            type="button"
            aria-label="Delete item"
            onClick={onDelete}
            className="text-[#8f8f8f] transition hover:text-black"
          >
            <Trash2 size={18} strokeWidth={2.2} />
          </button>
        )}

        <span className="text-[18px] font-medium text-black">{quantity}x</span>
      </div>
    </div>
  );
}
