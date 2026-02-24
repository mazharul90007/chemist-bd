import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chemist BD",
  description: "ChemistBD - a trusted online medicine shop",
};

import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-emerald-100 selection:text-emerald-900`}
      >
        <Providers>
          <Navbar />
          <main className="min-h-screen pt-16 md:pt-20 bg-white dark:bg-zinc-950">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
