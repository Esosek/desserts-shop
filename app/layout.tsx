import type { Metadata } from "next";
import { Red_Hat_Text } from "next/font/google";
import "./globals.css";

const fontFamily = Red_Hat_Text({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Deli Desserts",
  description: "Delicious desserts made with love for all the sweet lovers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontFamily.className} bg-rose-50`}>{children}</body>
    </html>
  );
}
