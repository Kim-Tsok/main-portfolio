import type React from "react";
import type { Metadata, Viewport } from "next";
import { Poppins, Inter, Newsreader } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import { site, socials } from "@/lib/site";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const siteUrl = site.url;
const siteName = site.name;
const siteTitle = `${site.name} | Front-End Developer Portfolio`;
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
  themeColor: "#eadfd8",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      className={`${inter.variable} ${poppins.variable} ${newsreader.variable}`}
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
        {children}
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
