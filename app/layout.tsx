import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import SocialLinks from "@/components/SocialLinks";
import { AuthProvider } from "@/lib/auth-context";

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
        <AuthProvider>
          <Navbar />
          <div className="bg-white border-b border-neutral-200">
            <div className="flex justify-center px-4 py-3">
              <SocialLinks
                className="justify-center text-lg text-black gap-6"
                linkClassName="text-black hover:text-neutral-700"
                iconClassName="h-5 w-5 fill-current"
              />
            </div>
          </div>
          <main className="min-h-screen bg-white">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
