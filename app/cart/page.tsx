"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import CartItem from "@/components/cart/CartItem";
import MobileContainer from "@/components/ui/MobileContainer";
import { getCart, removeCartItem } from "@/lib/api";
import { CartItem as CartItemType } from "@/types";

export default function CartPage() {
  const router = useRouter();

  const [items, setItems] = useState<CartItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeletingId, setIsDeletingId] = useState<string>("");
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");

  async function loadCart() {
    try {
      setIsLoading(true);
      setError("");

      const cartItems = await getCart();
      setItems(cartItems);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load cart");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadCart();
  }, []);

  async function handleDelete(cartItemId: string) {
    try {
      setIsDeletingId(cartItemId);
      setError("");
      setFeedback("");

      const result = await removeCartItem(cartItemId);
      setItems(result.data);
      setFeedback(result.message || "Cart item removed");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete item");
    } finally {
      setIsDeletingId("");
    }
  }

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const shippingCost = items.length > 0 ? 12 : 0;
  const totalPayment = subtotal + shippingCost;
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <MobileContainer>
      <div className="px-6 pb-6 pt-8">
        <div className="flex items-center justify-between">
          <button
            type="button"
            aria-label="Go back"
            onClick={() => window.history.back()}
            className="flex h-8 w-8 items-center justify-center"
          >
            <span className="text-[28px] leading-none text-black">‹</span>
          </button>

          <h1 className="text-[17px] font-medium text-black">Cart</h1>

          <div className="h-8 w-8" />
        </div>

        <div className="mt-8">
          <h2 className="text-[28px] font-semibold leading-none text-black">
            My Orders
          </h2>
        </div>

        {feedback && (
          <p className="mt-4 text-[14px] text-[#ff8a00]">{feedback}</p>
        )}

        {isLoading ? (
          <p className="mt-8 text-[15px] text-[#8f8f8f]">Loading cart...</p>
        ) : error ? (
          <p className="mt-8 text-[15px] text-red-500">{error}</p>
        ) : items.length === 0 ? (
          <div className="mt-8 space-y-4">
            <p className="text-[15px] text-[#8f8f8f]">Your cart is empty.</p>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="flex h-[52px] min-w-[150px] items-center justify-center rounded-full bg-[#ff8a00] px-6 text-[18px] font-medium text-white"
            >
              Shop Now
            </button>
          </div>
        ) : (
          <>
            <div className="mt-8 space-y-6">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className={isDeletingId === item.id ? "opacity-50" : ""}
                >
                  <CartItem
                    imageSrc={item.image}
                    title={item.name}
                    color={item.selectedColor.name}
                    size={`Size ${item.selectedSize}`}
                    price={`$${item.price.toFixed(2)}`}
                    quantity={item.quantity}
                    showActions={index === 1}
                    onDelete={() => handleDelete(item.id)}
                  />
                </div>
              ))}
            </div>

            <div className="mt-7 h-px bg-black/10" />

            <div className="mt-7 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-[16px] text-[#7f7f7f]">
                  Total Items ({totalItems})
                </span>
                <span className="text-[16px] font-semibold text-black">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[16px] text-[#7f7f7f]">
                  Standard Delivery
                </span>
                <span className="text-[16px] font-semibold text-black">
                  ${shippingCost.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[16px] text-[#7f7f7f]">
                  Total Payment
                </span>
                <span className="text-[16px] font-semibold text-black">
                  ${totalPayment.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => router.push("/checkout")}
                className="flex h-[56px] min-w-[170px] items-center justify-center rounded-full bg-[#ff8a00] px-8 text-[20px] font-medium text-white transition active:scale-[0.98]"
              >
                Checkout Now
              </button>
            </div>
          </>
        )}
      </div>
    </MobileContainer>
  );
}
