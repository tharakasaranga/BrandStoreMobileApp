export type ProductSize = "S" | "M" | "L" | "XL" | "XXL";

export type ProductColor = {
  id: string;
  name: string;
  hex: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  colors: ProductColor[];
  sizes: ProductSize[];
  description?: string;
};

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  selectedColor: ProductColor;
  selectedSize: ProductSize;
  quantity: number;
};

export type AddToCartPayload = {
  productId: string;
  selectedColorId: string;
  selectedSize: ProductSize;
  quantity: number;
};

export type Order = {
  id: string;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  totalPayment: number;
  paymentStatus: "paid";
  createdAt: string;
};