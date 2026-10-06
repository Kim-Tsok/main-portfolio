import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--d2-serif",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--d2-sans",
});

export const metadata: Metadata = {
  title: "Sample site: Ashby Lane Partners",
  description: "A sample multi-page style website for a mid-size Nigerian law firm.",
  robots: { index: false, follow: true },
};

export default function Demo2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${serif.variable} ${sans.variable} min-h-svh bg-white font-(family-name:--d2-sans) text-[#14201b]`}
    >
      {children}
    </div>
  );
}
