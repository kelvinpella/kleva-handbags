import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import SocialLinks from "@/components/SocialLinks";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kleva Handbags - New and Second-Hand Handbags",
  description: "Buy new and second-hand handbags at affordable prices",
  other: {
    'tiktok-developers-site-verification': 'eZnSmwsSipSuKDQUmD3cuc4eYrrt9iBx',
  },
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
        <div className="bg-white border-b border-neutral-200">
          <div className="flex justify-center px-4 py-3">
            <SocialLinks
              className="justify-center text-lg text-black gap-6"
              linkClassName="text-black hover:text-neutral-700"
              iconClassName="h-5 w-5 fill-current"
            />
          </div>
        </div>
        <div className="max-w-full lg:max-w-xl lg:mx-auto bg-yellow-50 my-4 border border-yellow-200">
          <div className="px-4 py-3">
            <div className="flex items-start gap-3">
              <svg
                className="h-6 w-6 text-yellow-600 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.72-1.36 3.485 0l6.518 11.59c.75 1.333-.213 2.983-1.742 2.983H3.48c-1.53 0-2.492-1.65-1.742-2.983L8.257 3.1zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-2a1 1 0 01-1-1V7a1 1 0 112 0v3a1 1 0 01-1 1z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="px-2 text-sm text-yellow-900">
                This catalog does not reflect our current inventory; Please
                contact us on WhatsApp to get our latest handbags.<br/><br/>
                <span className="italic">Katalogi hii haikisi mali iliyopo kwa sasa. Tafadhali wasiliana nasi whatsapp ili kupata pochi zetu zilizopo</span>
              </p>
            </div>
          </div>
        </div>
        <main className="min-h-screen bg-white">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
