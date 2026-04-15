# Brand Store Mobile App

This project is a mobile-first product details flow built using Next.js, React, TypeScript, and Tailwind CSS.
The UI is designed based on the provided Figma screens and focuses on achieving a clean and responsive layout.

---

## Technologies Used

React (App Router)
Next.js
TypeScript
Tailwind CSS

---

## Features

Mobile responsive UI
Product listing (Home screen)
Product details page with size and color selection
Add to cart functionality
Cart page with item list and delete option
Checkout flow with order creation
Simple mock backend using Next.js API routes

---

## Getting Started (Run Locally)

Follow these steps to run the project on your local machine:

### 1. Install dependencies

npm install

### 2. Run the development server

npm run dev

### 3. Open in browser

http://localhost:3000

---

## API Routes

This project uses Next.js API routes for a minimal backend.

GET /api/products -> Get product list
GET /api/products/:id -> Get single product
GET /api/cart -> Get cart items
POST /api/cart -> Add item to cart
DELETE /api/cart -> Remove item from cart
POST /api/orders -> Create order

---

## Seed Data

Products are not fetched from a database.
Instead, they are stored as static data in: /lib/data.ts

You can edit this file to change product names, prices, or images.

Example:

{
id: "1",
name: "Tagerine Shirt",
price: 240.32,
image: "/images/products/product-1.png"
}

---
