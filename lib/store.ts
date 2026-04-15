import { CartItem, Order } from "@/types";

type InMemoryStore = {
  cart: CartItem[];
  orders: Order[];
};

const globalForStore = globalThis as typeof globalThis & {
  __brandStore?: InMemoryStore;
};

export const store: InMemoryStore =
  globalForStore.__brandStore ??
  (globalForStore.__brandStore = {
    cart: [],
    orders: [],
  });
