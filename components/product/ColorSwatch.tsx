import { ProductColor } from "@/types";

type ColorSwatchProps = {
  color: ProductColor;
  active?: boolean;
  onClick?: () => void;
};

export default function ColorSwatch({
  color,
  active = false,
  onClick,
}: ColorSwatchProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={color.name}
      className={`flex h-7 w-7 items-center justify-center rounded-full transition ${
        active ? "ring-1 ring-black/20 ring-offset-2" : ""
      }`}
    >
      <span
        className="block h-5 w-5 rounded-full border border-white/60 shadow-sm"
        style={{ backgroundColor: color.hex }}
      />
    </button>
  );
}