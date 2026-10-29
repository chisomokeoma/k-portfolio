import type { Metadata } from "next";
import { Inter } from "next/font/google";
import RevealObserver from "@/components/RevealObserver";
import "./globals.css";

// The opsz axis gives the "Inter Display" cut automatically at larger sizes.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: "Amafina Kelvin — Founder, Thinker, Builder",
  description:
    "Physician by training, infrastructure thinker by conviction. Essays, intellectual extracts, interviews and the work of Langovest.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${inter.variable} antialiased`}
    >
      <body suppressHydrationWarning className="font-sans">
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
