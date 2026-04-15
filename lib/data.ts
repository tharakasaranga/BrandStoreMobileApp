import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Tagerine Shirt",
    category: "Men",
    price: 257.85,
    image: "/images/products/product-1.png",
    description: "Premium soft shirt for modern casual wear.",
    colors: [
      { id: "orange", name: "Orange Floral", hex: "#f0b37e" },
      { id: "navy", name: "Navy Floral", hex: "#44506b" },
      { id: "gray", name: "Gray Floral", hex: "#c9c9cf" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "2",
    name: "Leather Coart",
    category: "Men",
    price: 325.36,
    image: "/images/products/product-2.png",
    description: "Warm and stylish outerwear for all seasons.",
    colors: [
      { id: "brown", name: "Brown", hex: "#a8785b" },
      { id: "cream", name: "Cream", hex: "#e8dfd2" },
      { id: "black", name: "Black", hex: "#1e1e1e" },
    ],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "3",
    name: "Tagerine Shirt",
    category: "Men",
    price: 126.47,
    image: "/images/products/product-3.png",
    description: "Lightweight shirt with a modern fit.",
    colors: [
      { id: "orange", name: "Orange", hex: "#e0a46e" },
      { id: "blue", name: "Blue", hex: "#61708d" },
      { id: "white", name: "White", hex: "#ececec" },
    ],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "4",
    name: "Leather Coart",
    category: "Women",
    price: 257.85,
    image: "/images/products/product-4.png",
    description: "Classic premium coat with a clean silhouette.",
    colors: [
      { id: "brown", name: "Brown", hex: "#9d7457" },
      { id: "beige", name: "Beige", hex: "#ddd0c2" },
      { id: "black", name: "Black", hex: "#222222" },
    ],
    sizes: ["S", "M", "L", "XL"],
  },
];
