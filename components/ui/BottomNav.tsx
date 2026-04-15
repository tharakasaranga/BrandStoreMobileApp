import Link from "next/link";
import { Home, Search, ShoppingBag, Settings } from "lucide-react";

type BottomNavProps = {
  active?: "home" | "search" | "cart" | "settings";
};

export default function BottomNav({ active = "home" }: BottomNavProps) {
  const itemClass =
    "flex flex-col items-center justify-center gap-[6px] text-[13px] font-normal";

  const iconClass = "w-[22px] h-[22px]";

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] px-8 pt-4 pb-6 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="grid grid-cols-4 items-center">
        {/* Home */}
        <Link
          href="/"
          className={`${itemClass} ${
            active === "home" ? "text-[#ff8a00]" : "text-black"
          }`}
        >
          <Home className={`${iconClass}`} strokeWidth={1.8} />
          <span>Home</span>
        </Link>

        {/* Search */}
        <button
          className={`${itemClass} ${
            active === "search" ? "text-[#ff8a00]" : "text-black"
          }`}
        >
          <Search className={iconClass} strokeWidth={1.8} />
          <span>Search</span>
        </button>

        {/* Cart */}
        <Link
          href="/cart"
          className={`${itemClass} ${
            active === "cart" ? "text-[#ff8a00]" : "text-black"
          }`}
        >
          <div className="relative">
            <ShoppingBag className={iconClass} strokeWidth={1.8} />
            <span className="absolute -right-[2px] top-[1px] h-[6px] w-[6px] rounded-full bg-red-500" />
          </div>
          <span>Cart</span>
        </Link>

        {/* Settings */}
        <button
          className={`${itemClass} ${
            active === "settings" ? "text-[#ff8a00]" : "text-black"
          }`}
        >
          <Settings className={iconClass} strokeWidth={1.8} />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
}
