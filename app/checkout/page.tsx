"use client";

import { useEffect, useMemo, useState } from "react";
import { Clock3, ChevronLeft, Apple } from "lucide-react";
import MobileContainer from "@/components/ui/MobileContainer";
import { createOrder, getCart } from "@/lib/api";
import { CartItem } from "@/types";

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadCart() {
      try {
        setIsLoading(true);
        setErrorMessage("");
        const cartItems = await getCart();
        setItems(cartItems);
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : "Failed to load checkout",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadCart();
  }, []);

  const summary = useMemo(() => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const shippingCost = items.length > 0 ? 12 : 0;
    const totalPayment = subtotal + shippingCost;

    return {
      totalItems,
      subtotal,
      shippingCost,
      totalPayment,
    };
  }, [items]);

  async function handlePayNow() {
    try {
      setIsPaying(true);
      setSuccessMessage("");
      setErrorMessage("");

      const result = await createOrder();
      setSuccessMessage(`Payment successful. Order ID: ${result.data.orderId}`);
      setItems([]);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Payment failed",
      );
    } finally {
      setIsPaying(false);
    }
  }

  return (
    <MobileContainer>
      <div className="px-6 pb-8 pt-8">
        {/* Header */}
        <div className="relative flex items-center justify-center">
          <button
            type="button"
            aria-label="Go back"
            onClick={() => window.history.back()}
            className="absolute left-0 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center"
          >
            <ChevronLeft size={22} strokeWidth={2.2} className="text-black" />
          </button>

          <h1 className="text-[17px] font-medium text-black">Checkout</h1>
        </div>

        {/* Delivery Address */}
        <div className="mt-9">
          <h2 className="text-[13px] font-medium text-[#8e8e8e]">
            Delivery Address
          </h2>

          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              {/* Map thumbnail */}
              <div className="relative h-[38px] w-[38px] shrink-0 overflow-hidden rounded-[8px] bg-[#eef2e8]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,#c7dbb5_0_18%,transparent_19%),radial-gradient(circle_at_70%_70%,#b4d1a5_0_16%,transparent_17%),linear-gradient(135deg,#f0f2ec_0%,#dce7d5_100%)]" />
                <div className="absolute left-[8px] top-[5px] h-[24px] w-[4px] rotate-[40deg] rounded-full bg-white/80" />
                <div className="absolute left-[18px] top-[4px] h-[28px] w-[4px] -rotate-[35deg] rounded-full bg-white/80" />
              </div>

              <div className="min-w-0">
                <p className="text-[14px] font-semibold leading-[1.45] text-black">
                  25/3 Housing Estate,
                  <br />
                  Sylhet
                </p>
              </div>
            </div>

            <button
              type="button"
              className="shrink-0 text-[13px] font-medium text-[#9a9a9a]"
            >
              Change
            </button>
          </div>
        </div>

        {/* Delivery time */}
        <div className="mt-6 flex items-center gap-3">
          <Clock3 size={18} strokeWidth={1.9} className="text-[#6f6f6f]" />
          <p className="text-[14px] text-[#4a4a4a]">Delivered in next 7 days</p>
        </div>

        {/* Payment Method */}
        <div className="mt-8">
          <h2 className="text-[13px] font-medium text-[#8e8e8e]">
            Payment Method
          </h2>

          <div className="mt-4 flex items-center gap-4">
            <span className="text-[22px] font-black italic tracking-tight text-[#1a4fb2]">
              VISA
            </span>

            <div className="flex items-center">
              <span className="text-[10px] font-bold leading-none text-[#3b7dd8]">
                AMERICAN
                <br />
                EXPRESS
              </span>
            </div>

            <div className="relative h-[18px] w-[28px]">
              <span className="absolute left-0 top-0 h-[16px] w-[16px] rounded-full bg-[#ea001b]" />
              <span className="absolute left-[11px] top-0 h-[16px] w-[16px] rounded-full bg-[#f79e1b]" />
            </div>

            <span className="text-[21px] font-extrabold italic text-[#1448b8]">
              PayPal
            </span>

            <div className="flex items-center gap-1 text-black">
              <Apple size={16} strokeWidth={2.5} />
              <span className="text-[20px] font-semibold tracking-tight">
                Pay
              </span>
            </div>
          </div>
        </div>

        {/* Voucher */}
        <div className="mt-8 rounded-[6px] bg-[#f8f8f8] py-5 text-center">
          <p className="text-[14px] text-[#707070]">Add Voucher</p>
        </div>

        {/* Note */}
        <div className="mt-7">
          <p className="text-[14px] leading-[1.75] text-[#8a8a8a]">
            <span className="font-medium text-[#ff5a3d]">Note :</span> Use your
            order id at the payment. Your Id #
            {successMessage ? successMessage.split(": ").at(-1) : "154619"} if
            you forget to put your order id we can’t confirm the payment.
          </p>
        </div>

        {/* Totals */}
        {isLoading ? (
          <p className="mt-8 text-[14px] text-[#8f8f8f]">Loading checkout...</p>
        ) : (
          <div className="mt-9 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-[16px] text-[#6f6f6f]">
                Total Items ({summary.totalItems})
              </span>
              <span className="text-[16px] font-semibold text-black">
                ${summary.subtotal.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[16px] text-[#6f6f6f]">
                Standard Delivery
              </span>
              <span className="text-[16px] font-semibold text-black">
                ${summary.shippingCost.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[16px] text-[#6f6f6f]">Total Payment</span>
              <span className="text-[16px] font-semibold text-black">
                ${summary.totalPayment.toFixed(2)}
              </span>
            </div>
          </div>
        )}

        {successMessage && (
          <p className="mt-6 text-[14px] text-[#ff8a00]">{successMessage}</p>
        )}

        {errorMessage && (
          <p className="mt-6 text-[14px] text-red-500">{errorMessage}</p>
        )}

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={handlePayNow}
            disabled={isPaying || isLoading || items.length === 0}
            className="flex h-[42px] min-w-[142px] items-center justify-center rounded-full bg-[#ff8a00] px-8 text-[16px] font-medium text-white transition active:scale-[0.98] disabled:opacity-70"
          >
            {isPaying ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </div>
    </MobileContainer>
  );
}
