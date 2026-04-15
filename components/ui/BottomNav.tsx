import Link from "next/link";
import { Home, Search, ShoppingBag, Settings } from "lucide-react";

type BottomNavProps = {
  active?: "home" | "search" | "cart" | "settings";
};

export default function BottomNav({ active = "home" }: BottomNavProps) {
  // Common style for each nav item
  const itemClass = "flex flex-col items-center justify-center gap-1.5";
  const textClass = "text-[13px] font-medium leading-none";
  const iconSize = 24;

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] px-8 pt-4 pb-6 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
      <div className="grid grid-cols-4 w-full items-center">
        {/* Home */}
        <Link
          href="/"
          className={`${itemClass} ${active === "home" ? "text-[#ff8a00]" : "text-black"}`}
        >
          <Home size={iconSize} strokeWidth={1.8} />
          <span className={textClass}>Home</span>
        </Link>

        {/* Search */}
        <button
          className={`${itemClass} ${active === "search" ? "text-[#ff8a00]" : "text-black"}`}
        >
          <Search size={iconSize} strokeWidth={1.8} />
          <span className={textClass}>Search</span>
        </button>

        {/* Cart */}
        <Link
          href="/cart"
          className={`${itemClass} ${active === "cart" ? "text-[#ff8a00]" : "text-black"}`}
        >
          <div className="relative">
            <ShoppingBag size={iconSize} strokeWidth={1.8} />
            {/* Red Notification Dot - Exact placement as per image */}
            <span className="absolute -top-0.5 -right-0.5 h-[7px] w-[7px] rounded-full bg-red-600 border border-white" />
          </div>
          <span className={textClass}>Cart</span>
        </Link>

        {/* Settings */}
        <button
          className={`${itemClass} ${active === "settings" ? "text-[#ff8a00]" : "text-black"}`}
        >
          <Settings size={iconSize} strokeWidth={1.8} />
          <span className={textClass}>Settings</span>
        </button>
      </div>
    </div>
  );
}
