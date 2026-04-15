import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brand Store",
  description: "Mobile fashion shopping app UI built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
