import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--d1-serif",
  weight: ["500", "600", "700"],
});

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--d1-sans",
});

export const metadata: Metadata = {
  title: "Sample site: Kestrel Chambers",
  description: "A sample one-page website for a small Nigerian law chambers.",
  robots: { index: false, follow: true },
};

export default function Demo1Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${serif.variable} ${sans.variable} min-h-svh bg-[#f5efe3] font-(family-name:--d1-sans) text-[#15233b]`}
    >
      {children}
    </div>
  );
}
