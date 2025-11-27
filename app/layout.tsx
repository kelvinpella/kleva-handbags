import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kleva Handbags - New and Second-Hand Handbags",
  description: "Buy new and second-hand handbags at affordable prices",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US">
      <body className={`${montserrat.className} bg-white w-full`}>
        <Navbar />
        <main className="min-h-screen bg-white">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
