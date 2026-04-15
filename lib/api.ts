import { AddToCartPayload, CartItem, Order, Product } from "@/types";

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
};

const MOCK_USER_ID = process.env.NEXT_PUBLIC_MOCK_USER_ID || "test-user-1";

function createHeaders(contentType = false) {
  return {
    ...(contentType ? { "Content-Type": "application/json" } : {}),
    "x-user-id": MOCK_USER_ID,
  };
}

export async function getProducts() {
  const response = await fetch("/api/products");
  const result = (await response.json()) as ApiResponse<Product[]>;

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to fetch products");
  }

  return result.data;
}

export async function getCart() {
  const response = await fetch("/api/cart", {
    cache: "no-store",
    headers: createHeaders(),
  });

  const result = (await response.json()) as ApiResponse<CartItem[]>;

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to fetch cart");
  }

  return result.data;
}

export async function addToCart(payload: AddToCartPayload) {
  const response = await fetch("/api/cart", {
    method: "POST",
    headers: createHeaders(true),
    body: JSON.stringify(payload),
  });

  const result = (await response.json()) as ApiResponse<CartItem[]>;

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to add item to cart");
  }

  return result;
}

export async function removeCartItem(cartItemId: string) {
  const response = await fetch("/api/cart", {
    method: "DELETE",
    headers: createHeaders(true),
    body: JSON.stringify({ cartItemId }),
  });

  const result = (await response.json()) as ApiResponse<CartItem[]>;

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to remove cart item");
  }

  return result;
}

export async function createOrder() {
  const response = await fetch("/api/orders", {
    method: "POST",
    headers: createHeaders(),
  });

  const result = (await response.json()) as ApiResponse<{
    orderId: string;
    paymentStatus: Order["paymentStatus"];
    subtotal: number;
    shippingCost: number;
    totalPayment: number;
  }>;

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to create order");
  }

  return result;
}
