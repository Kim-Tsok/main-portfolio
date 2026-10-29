import type { Metadata } from "next";
import localFont from "next/font/local";

const serif = localFont({
  src: [{path:"../../fonts/cormorant-garamond-latin.woff2",weight:"500 700"}],
  variable: "--d1-serif", display:"swap",
});
const sans = localFont({
  src: [{path:"../../fonts/source-sans-3-latin.woff2",weight:"200 900"}],
  variable: "--d1-sans", display:"swap",
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
