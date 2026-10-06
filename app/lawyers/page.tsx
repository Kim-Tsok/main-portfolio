import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import MotionProvider from "@/components/motion-provider";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import Pricing from "@/components/lawyers/pricing";
import Faq from "@/components/lawyers/faq";
import { addOns, faqs, quoteMessage, samples, steps, tiers } from "@/lib/lawyers";
import { jsonLd } from "@/lib/schema";
import { site, waLink } from "@/lib/site";

const title = "Law Firm Website Design in Nigeria";
const description =
  "Websites for Nigerian law firms and chambers in Lagos, Abuja and across Nigeria. Mobile friendly, WhatsApp enquiries, Google visibility. From ₦60,000, ready in 3 to 14 days.";
const pageUrl = `${site.url}/lawyers`;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "law firm website design Nigeria",
    "lawyer website Nigeria",
    "website for lawyers in Lagos",
    "law firm website Abuja",
    "chambers website design",
    "legal practice website",
    "NBA law firm website",
    "web developer for lawyers Nigeria",
  ],
  alternates: { canonical: "/lawyers" },
  openGraph: {
    type: "website",
    url: pageUrl,
    title: `${title} | ${site.name}`,
    description,
    siteName: site.name,
    locale: "en_NG",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${site.name}`,
    description,
    creator: "@im_telepathic",
    images: ["/og-image.png"],
  },
};

const reasons = [
  {
    title: "Clients check you first",
    body: "Most people look a lawyer up on their phone before they call. A clear site tells them who you are, what you handle and how to reach you.",
  },
  {
    title: "Your directory listing has a gap",
    body: "If someone finds your firm in the NBA-SLP directory and wants to know more, a website gives them somewhere to click.",
  },
  {
    title: "One tap to reach you",
    body: "A WhatsApp button and a simple form mean fewer missed enquiries and no hunting for a phone number.",
  },
];

export default function LawyersPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: title,
        serviceType: "Website design for law firms",
        description,
        url: pageUrl,
        areaServed: { "@type": "Country", name: "Nigeria" },
        provider: { "@type": "Person", name: site.name, url: site.url },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Law firm website packages",
          itemListElement: tiers.map((t) => ({
            "@type": "Offer",
            name: `${t.name} package`,
            description: t.forWho,
            price: t.price,
            priceCurrency: "NGN",
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
          { "@type": "ListItem", position: 2, name: "Law firm websites", item: pageUrl },
        ],
      },
    ],
  };

  return (
    <MotionProvider>
      <div className="grid-paper min-h-svh">
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />

        <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
          <nav className="container-page flex h-16 items-center justify-between md:h-18">
            <Link href="/" className="font-serif text-3xl font-medium italic text-ink">
              Kim<span className="text-tan">.</span>
            </Link>
            <div className="flex items-center gap-2">
              <a
                href="#pricing"
                className="hidden rounded-full px-4 py-2 text-sm text-ink/75 transition-colors hover:text-ink sm:block"
              >
                Packages
              </a>
              <a
                href={waLink(quoteMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 rounded-full bg-brown px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brown-deep"
              >
                Chat on WhatsApp
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </nav>
        </header>

        <main>
          <section className="relative overflow-hidden pb-20 pt-20 md:pb-28 md:pt-28">
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/3 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(171_129_100/0.18),transparent)]"
            />
            <div className="container-page relative">
              <Reveal>
                <p className="text-sm font-medium text-tan">For lawyers and chambers</p>
                <h1 className="mt-4 max-w-4xl text-balance text-[2.4rem] font-semibold leading-[1.04] text-ink sm:text-6xl md:text-7xl">
                  Websites for Nigerian{" "}
                  <span className="font-serif font-normal italic tracking-normal">
                    law firms
                  </span>
                </h1>
                <p className="mt-7 max-w-xl text-base leading-relaxed text-brown md:text-lg">
                  A clean, fast site that shows your practice areas, your team
                  and a one-tap way to reach you. Ready in 3 to 14 days, from
                  ₦60,000, and the firm owns all of it.
                </p>
              </Reveal>
              <Reveal delay={0.1} className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#pricing"
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brown px-7 font-medium text-white transition-colors hover:bg-brown-deep"
                >
                  See packages
                  <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
                </a>
                <a
                  href="#samples"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-brown/40 px-7 font-medium text-brown transition-colors hover:border-brown hover:bg-brown/5"
                >
                  View sample sites
                </a>
              </Reveal>
            </div>
          </section>

          <section className="pb-24 md:pb-32">
            <div className="container-page">
              <ul className="grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line md:grid-cols-3">
                {reasons.map((r, i) => (
                  <li key={r.title} className="bg-paper">
                    <Reveal delay={i * 0.06} className="h-full p-6 md:p-8">
                      <h2 className="text-xl font-semibold text-ink">{r.title}</h2>
                      <p className="mt-3 leading-relaxed text-brown">{r.body}</p>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section id="samples" className="pb-24 md:pb-32">
            <div className="container-page">
              <SectionHeading
                title={
                  <>
                    See what your site{" "}
                    <span className="font-serif font-normal italic tracking-normal">
                      could look like
                    </span>
                  </>
                }
              >
                Two sample sites for made-up firms, so you can open them on your
                phone and click around.
              </SectionHeading>
              <ul className="grid gap-4 md:grid-cols-2">
                {samples.map((s, i) => (
                  <li key={s.href}>
                    <Reveal delay={i * 0.06}>
                      <Link
                        href={s.href}
                        className="group flex h-full flex-col justify-between gap-10 rounded-[1.5rem] border border-line bg-paper/70 p-6 transition-colors hover:border-tan md:p-8"
                      >
                        <div>
                          <p className="text-sm text-tan">Sample site</p>
                          <h3 className="mt-2 text-2xl font-semibold text-ink md:text-3xl">
                            {s.name}
                          </h3>
                          <p className="mt-2 text-brown">{s.kind}</p>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-brown/80">Fits the {s.fits}</span>
                          <ArrowUpRight className="size-5 text-ink transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </Link>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section id="pricing" className="pb-24 md:pb-32">
            <div className="container-page">
              <SectionHeading
                title={
                  <>
                    Six packages,{" "}
                    <span className="font-serif font-normal italic tracking-normal">
                      one-off prices
                    </span>
                  </>
                }
              >
                From a one-page site for a solo practitioner to a flagship site
                for a large firm. No monthly fee unless you want the Care Plan.
              </SectionHeading>
              <Pricing />
            </div>
          </section>

          <section className="pb-24 md:pb-32">
            <div className="container-page grid gap-12 md:grid-cols-12">
              <div className="md:col-span-5">
                <SectionHeading title="Add-ons">
                  Works with every package. Logo refreshes, letterheads and
                  business cards can be quoted too.
                </SectionHeading>
              </div>
              <ul className="border-t border-line md:col-span-7">
                {addOns.map((a, i) => (
                  <li key={a.name} className="border-b border-line">
                    <Reveal
                      delay={i * 0.05}
                      className="grid gap-1 py-5 sm:grid-cols-[1fr_auto] sm:gap-6"
                    >
                      <div>
                        <h3 className="text-lg font-medium text-ink">{a.name}</h3>
                        <p className="mt-1 text-sm text-brown">{a.detail}</p>
                      </div>
                      <p className="font-medium text-ink sm:text-right">{a.price}</p>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="pb-24 md:pb-32">
            <div className="container-page">
              <SectionHeading title="How it works">
                You send your details, I handle the domain, hosting, design and
                setup.
              </SectionHeading>
              <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {steps.map((s, i) => (
                  <li key={s.title}>
                    <Reveal
                      delay={i * 0.05}
                      className="h-full rounded-[1.25rem] border border-line bg-paper/70 p-5"
                    >
                      <h3 className="text-lg font-semibold text-ink">{s.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-brown">{s.body}</p>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="pb-24 md:pb-32">
            <div className="container-page">
              <SectionHeading title="Questions lawyers ask" />
              <Reveal>
                <Faq />
              </Reveal>
            </div>
          </section>

          <section className="px-3 pb-3 md:px-4 md:pb-4">
            <div className="overflow-hidden rounded-[2rem] bg-brown-deep text-paper">
              <div className="container-page py-20 md:py-28">
                <Reveal>
                  <h2 className="max-w-4xl text-4xl font-semibold leading-[1.05] text-white sm:text-6xl">
                    Ready to put the firm{" "}
                    <span className="font-serif font-normal italic tracking-normal text-tan">
                      online?
                    </span>
                  </h2>
                  <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/75">
                    Send a message with the firm&apos;s name and how many lawyers
                    you have. I&apos;ll reply with the package that fits.
                  </p>
                </Reveal>
                <Reveal delay={0.1} className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={waLink(quoteMessage())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-paper px-8 font-medium text-ink transition-colors hover:bg-white"
                  >
                    Chat on WhatsApp
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <a
                    href={`mailto:${site.email}?subject=${encodeURIComponent("Law firm website")}`}
                    className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-paper/25 px-6 font-medium text-paper transition-colors hover:border-paper/60"
                  >
                    {site.email}
                  </a>
                </Reveal>
              </div>
              <footer className="container-page">
                <div className="flex flex-col gap-4 border-t border-paper/15 py-8 text-sm text-paper/60 sm:flex-row sm:items-center sm:justify-between">
                  <p>
                    &copy; {new Date().getFullYear()} {site.fullName}
                  </p>
                  <Link href="/" className="transition-colors hover:text-white">
                    See my other work
                  </Link>
                </div>
              </footer>
            </div>
          </section>
        </main>
      </div>
    </MotionProvider>
  );
}
