import type { Metadata } from "next";
import localFont from "next/font/local";

const serif = localFont({
  src: [{path:"../../fonts/fraunces-latin.woff2",weight:"100 900"}],
  variable: "--d2-serif", display:"swap",
});
const sans = localFont({
  src: [{path:"../../fonts/manrope-latin.woff2",weight:"200 800"}],
  variable: "--d2-sans", display:"swap",
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
