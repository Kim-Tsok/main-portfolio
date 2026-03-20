import type React from "react";
import type { Metadata } from "next";
import { Poppins, Inter, Newsreader } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import "./globals.css";

const _poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
});

const _inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const siteName = "Kim Tsok";
const siteTitle = "Kim Tsok | Front-End Developer Portfolio";
const siteDescription =
  "Kim Tsok is a front-end developer building modern, high-performance web experiences with React and Next.js.";
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
  authors: [{ name: "Kim Tsok", url: siteUrl }],
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
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kim Tsok",
    alternateName: "Kim Kelvin Tsok",
    jobTitle: "Front-End Developer",
    description: siteDescription,
    email: "mailto:tsokkim556@gmail.com",
    url: siteUrl,
    sameAs: [
      "https://github.com/Kim-Tsok",
      "https://x.com/im_telepathic",
      "https://www.linkedin.com",
      "https://www.instagram.com/im_telepathic",
      "https://www.youtube.com/@pixelbluegames",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description: siteDescription,
    author: {
      "@type": "Person",
      name: "Kim Tsok",
    },
  };

  return (
    <html lang="en">
      <body
        className={`${_inter.variable} ${_poppins.variable} ${newsreader.variable} font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
