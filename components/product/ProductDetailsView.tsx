"use client";

import Image from "next/image";
import { useState } from "react";
import ColorSwatch from "@/components/product/ColorSwatch";
import SizeSelector from "@/components/product/SizeSelector";
import { addToCart } from "@/lib/api";
import { Product, ProductSize } from "@/types";

type ProductDetailsViewProps = {
  product: Product;
};

export default function ProductDetailsView({
  product,
}: ProductDetailsViewProps) {
  const defaultSize = product.sizes.includes("L") ? "L" : product.sizes[0];

  const [selectedSize, setSelectedSize] = useState<ProductSize>(defaultSize);
  const [selectedColorId, setSelectedColorId] = useState(product.colors[0]?.id);
  const [isAdding, setIsAdding] = useState(false);
  const [feedback, setFeedback] = useState("");

  async function handleAddToCart() {
    try {
      setIsAdding(true);
      setFeedback("");

      const result = await addToCart({
        productId: product.id,
        selectedColorId,
        selectedSize,
        quantity: 1,
      });

      setFeedback(result.message || "Item added to cart");
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <div className="px-6 pb-6 pt-8">
      <div className="flex items-center justify-between">
        <button
          type="button"
          aria-label="Go back"
          className="flex h-8 w-8 items-center justify-center"
          onClick={() => window.history.back()}
        >
          <span className="text-[28px] leading-none text-black">‹</span>
        </button>

        <h1 className="text-[17px] font-medium text-black">Details</h1>

        <button
          type="button"
          aria-label="Bookmark product"
          className="flex h-8 w-8 items-center justify-center"
        >
          <span className="inline-block h-[18px] w-[14px] rounded-[4px] border border-black" />
        </button>
      </div>

      {/* Product image */}
      <div className="mt-6 overflow-hidden rounded-[32px] bg-[#efe7db]">
        <div className="relative h-[296px] w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 375px"
            priority
          />
        </div>

        <div className="flex justify-center pb-3 pt-3">
          <div className="flex items-center gap-1">
            <span className="h-[4px] w-[18px] rounded-full bg-white" />
            <span className="h-[4px] w-[8px] rounded-full bg-white/70" />
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <h2 className="max-w-[210px] text-[25px] font-semibold leading-[1.05] text-black">
          {product.name}
        </h2>

        <div className="mt-1 flex items-center gap-2">
          {product.colors.map((color) => (
            <ColorSwatch
              key={color.id}
              color={color}
              active={selectedColorId === color.id}
              onClick={() => setSelectedColorId(color.id)}
            />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-[16px] font-semibold text-black">Size</h3>
        <SizeSelector
          sizes={product.sizes}
          selectedSize={selectedSize}
          onChange={setSelectedSize}
        />
      </div>

      {feedback && (
        <p className="mt-5 text-[14px] text-[#ff8a00]">{feedback}</p>
      )}

      <div className="mt-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-[22px] font-semibold text-black">
            ${product.price.toFixed(2)}
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isAdding}
          className="flex h-[56px] min-w-[166px] items-center justify-center rounded-full bg-[#ff8a00] px-8 text-[20px] font-medium text-white transition active:scale-[0.98] disabled:opacity-70"
        >
          {isAdding ? "Adding..." : "Add To Cart"}
        </button>
      </div>
    </div>
  );
}
