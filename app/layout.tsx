import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import PageTransition from "@/components/PageTransition";
import ErrorHandler from "@/components/ErrorHandler";
import HomeBackground from "@/components/HomeBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Studio Architecture & Design",
  description: "Creative architecture and design studio.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="bg-black text-white antialiased min-h-screen overflow-x-hidden">
        <ErrorHandler />
        <Preloader>
          {/* Global background slideshow (all pages) */}
          <div className="fixed inset-0 -z-10 pointer-events-none">
            <HomeBackground />
          </div>
          <Navbar />
          <PageTransition>
            <main className="min-h-screen w-full relative">{children}</main>
          </PageTransition>
        </Preloader>
      </body>
    </html>
  );
}
