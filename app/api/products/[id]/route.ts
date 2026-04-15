import { NextResponse } from "next/server";
import { products } from "@/lib/data";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_: Request, context: RouteContext) {
  const { id } = await context.params;

  const product = products.find((item) => item.id === id);

  if (!product) {
    return NextResponse.json(
      {
        success: false,
        message: "Product not found",
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    success: true,
    data: product,
  });
}
