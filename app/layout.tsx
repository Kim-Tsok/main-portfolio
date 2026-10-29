import type React from "react";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import { site, socials } from "@/lib/site";
import "./globals.css";
import SettingsProvider from "@/components/settings-provider";
import {getSettings} from "@/lib/content";

const display = localFont({
  src: [
    { path: "./fonts/barlow-condensed-600.woff2", weight: "600" },
    { path: "./fonts/barlow-condensed-700.woff2", weight: "700" },
    { path: "./fonts/barlow-condensed-800.woff2", weight: "800" },
  ],
  variable: "--font-display", display: "swap",
});

const poppins = localFont({
  src: [
    { path: "./fonts/poppins-500.woff2", weight: "500" },
    { path: "./fonts/poppins-600.woff2", weight: "600" },
    { path: "./fonts/poppins-700.woff2", weight: "700" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

const inter = localFont({
  src: [{ path: "./fonts/inter-latin-variable.woff2", weight: "100 900" }],
  variable: "--font-inter",
  display: "swap",
});

const newsreader = localFont({
  src: [
    { path: "./fonts/newsreader-latin-variable.woff2", weight: "400 500", style: "normal" },
    { path: "./fonts/newsreader-latin-italic-variable.woff2", weight: "400 500", style: "italic" },
  ],
  variable: "--font-newsreader",
  display: "swap",
});

const siteUrl = site.url;
const siteName = site.name;
const siteTitle = `${site.name} | Product Engineer & Developer`;
const siteDescription = site.description;
const siteKeywords = [
  "Kim Tsok",
  "Kim Kelvin Tsok",
  "Front-end developer",
  "Frontend developer portfolio",
  "React developer",
  "Next.js developer",
  "JavaScript developer",
  "TypeScript developer",
  "Web developer",
  "UI developer",
];

export const viewport: Viewport = {
  themeColor: "#151619",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Kim Tsok",
  },
  verification: {
    google: "ByYOrfiiKs9mfEQa_NmMyWh5Z23cPm9eGpDDoK2gTGI",
  },
  description: siteDescription,
  keywords: siteKeywords,
  applicationName: siteName,
  category: "portfolio",
  authors: [{ name: site.name, url: siteUrl }],
  creator: "Kim Tsok",
  publisher: "Kim Tsok",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName,
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kim Kelvin Tsok - Frontend Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    creator: "@im_telepathic",
    images: ["/og-image.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings=await getSettings();
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    alternateName: site.fullName,
    jobTitle: site.role,
    description: siteDescription,
    email: `mailto:${site.email}`,
    url: siteUrl,
    sameAs: socials
      .filter((s) => s.label !== "WhatsApp")
      .map((s) => s.href),
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description: siteDescription,
    author: {
      "@type": "Person",
      name: site.name,
    },
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${newsreader.variable} ${display.variable}`}
    >
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <SettingsProvider value={settings}>{children}</SettingsProvider>
        <Analytics />
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "var(--ink)",
              color: "#fff",
              border: "none",
              borderRadius: "999px",
            },
          }}
        />
      </body>
    </html>
  );
}
