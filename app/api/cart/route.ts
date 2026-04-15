import { NextResponse } from "next/server";
import { products } from "@/lib/data";
import { store } from "@/lib/store";
import { generateId } from "@/lib/utils";
import { AddToCartPayload } from "@/types";
import { validateMockUser } from "@/lib/auth";

export async function GET(request: Request) {
  const unauthorized = validateMockUser(request);
  if (unauthorized) return unauthorized;

  return NextResponse.json({
    success: true,
    data: store.cart,
  });
}

export async function POST(request: Request) {
  const unauthorized = validateMockUser(request);
  if (unauthorized) return unauthorized;

  try {
    const body = (await request.json()) as AddToCartPayload;

    const { productId, selectedColorId, selectedSize, quantity } = body;

    if (!productId || !selectedColorId || !selectedSize || !quantity) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 },
      );
    }

    const product = products.find((item) => item.id === productId);

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 },
      );
    }

    const selectedColor = product.colors.find(
      (color) => color.id === selectedColorId,
    );

    if (!selectedColor) {
      return NextResponse.json(
        {
          success: false,
          message: "Selected color is invalid",
        },
        { status: 400 },
      );
    }

    const existingItem = store.cart.find(
      (item) =>
        item.productId === productId &&
        item.selectedColor.id === selectedColorId &&
        item.selectedSize === selectedSize,
    );

    if (existingItem) {
      existingItem.quantity += quantity;

      return NextResponse.json({
        success: true,
        message: "Cart item quantity updated",
        data: store.cart,
      });
    }

    const newCartItem = {
      id: generateId("cart"),
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      selectedColor,
      selectedSize,
      quantity,
    };

    store.cart.push(newCartItem);

    return NextResponse.json(
      {
        success: true,
        message: "Item added to cart",
        data: store.cart,
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid request body",
      },
      { status: 400 },
    );
  }
}

export async function DELETE(request: Request) {
  const unauthorized = validateMockUser(request);
  if (unauthorized) return unauthorized;

  try {
    const body = (await request.json()) as { cartItemId?: string };
    const cartItemId = body.cartItemId;

    if (!cartItemId) {
      return NextResponse.json(
        {
          success: false,
          message: "Cart item id is required",
        },
        { status: 400 },
      );
    }

    const itemIndex = store.cart.findIndex((item) => item.id === cartItemId);

    if (itemIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          message: "Cart item not found",
        },
        { status: 404 },
      );
    }

    store.cart.splice(itemIndex, 1);

    return NextResponse.json({
      success: true,
      message: "Cart item removed",
      data: store.cart,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid delete request",
      },
      { status: 400 },
    );
  }
}
