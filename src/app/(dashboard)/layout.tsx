import type { Metadata } from "next";
import "../globals.css";
import { Sidebar } from "../_components/Sidebar/page";
import { Inter } from "next/font/google";

const inter = Inter({
  display: "auto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stockly",
  description: "Stockly is a simple inventory management system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased`}>
        <main className="flex h-full gap-8">
          <Sidebar />
          {children}
        </main>
      </body>
    </html>
  );
}
