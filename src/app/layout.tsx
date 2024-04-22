import { cn } from "@/lib/utils";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TOMA Translate",
  description: "An easy and fast translation web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-full">
      <body
        className={cn(
          GeistSans.variable,
          GeistMono.variable,
          "h-full bg-background font-sans text-foreground"
        )}
      >
        {children}
      </body>
    </html>
  );
}
