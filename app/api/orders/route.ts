import { NextResponse } from "next/server";
import { store } from "@/lib/store";
import { generateId } from "@/lib/utils";
import { validateMockUser } from "@/lib/auth";

export async function POST(request: Request) {
  const unauthorized = validateMockUser(request);
  if (unauthorized) return unauthorized;

  if (store.cart.length === 0) {
    return NextResponse.json(
      {
        success: false,
        message: "Cart is empty",
      },
      { status: 400 },
    );
  }

  const subtotal = store.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const shippingCost = 12;
  const totalPayment = subtotal + shippingCost;

  const order = {
    id: generateId("order"),
    items: [...store.cart],
    subtotal,
    shippingCost,
    totalPayment,
    paymentStatus: "paid" as const,
    createdAt: new Date().toISOString(),
  };

  store.orders.push(order);
  store.cart = [];

  return NextResponse.json(
    {
      success: true,
      message: "Order created successfully",
      data: {
        orderId: order.id,
        paymentStatus: order.paymentStatus,
        subtotal: order.subtotal,
        shippingCost: order.shippingCost,
        totalPayment: order.totalPayment,
      },
    },
    { status: 201 },
  );
}
