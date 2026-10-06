// Content for the /lawyers landing page. The page, its JSON-LD and the
// WhatsApp quote messages all read from here, so prices change in one place.

export type Tier = {
  name: string;
  price: number;
  // Shown on the card; SAN is a starting price.
  priceLabel: string;
  forWho: string;
  features: string[];
  delivery: string;
  edits: string;
  featured?: boolean;
};

export const tiers: Tier[] = [
  {
    name: "Brief",
    price: 60000,
    priceLabel: "₦60,000",
    forWho: "Solo practitioners who just need to exist online.",
    features: [
      "One-page site: firm name, about, practice areas, contact",
      "WhatsApp click-to-chat button",
      "Google Maps pin for your office",
    ],
    delivery: "3 days",
    edits: "1 round of edits",
  },
  {
    name: "Chambers",
    price: 120000,
    priceLabel: "₦120,000",
    forWho: "Small chambers with 2 to 3 lawyers.",
    features: [
      "4 pages: Home, About, Practice Areas, Contact",
      "Logo cleanup",
      "Firm email address (info@yourfirm.com)",
      "Basic SEO so the firm shows up when someone Googles its name",
    ],
    delivery: "5 days",
    edits: "2 rounds of edits",
  },
  {
    name: "Counsel",
    price: 200000,
    priceLabel: "₦200,000",
    forWho: "Growing firms that want to look established.",
    features: [
      "6 pages, including a team page with lawyer profiles and photos",
      "A separate page for each practice area",
      "Google Business Profile setup",
      "Enquiry form with an automatic reply to the client",
    ],
    delivery: "7 days",
    edits: "2 rounds of edits",
    featured: true,
  },
  {
    name: "Partner",
    price: 350000,
    priceLabel: "₦350,000",
    forWho: "Firms with 5+ lawyers that want clients to find them.",
    features: [
      "Up to 10 pages",
      "News or articles section the firm can publish to",
      "SEO for each practice area and city",
      "Online consultation booking form",
      "Analytics to see visits and enquiries",
    ],
    delivery: "10 days",
    edits: "3 rounds of edits",
  },
  {
    name: "Senior Partner",
    price: 600000,
    priceLabel: "₦600,000",
    forWho: "Established firms with multiple offices or a strong brand.",
    features: [
      "Custom design built around the firm's brand",
      "Up to 15 pages and multiple office locations",
      "Publications and notable matters (with client consent)",
      "Newsletter signup and a secure enquiry inbox",
      "3 months of free updates",
    ],
    delivery: "14 days",
    edits: "Unlimited edits during the build",
  },
  {
    name: "SAN",
    price: 1000000,
    priceLabel: "From ₦1,000,000",
    forWho: "Large firms and chambers that need a flagship site.",
    features: [
      "Fully custom website with unlimited pages",
      "Secure client portal for sharing documents",
      "Staff login to update content yourselves",
      "Content writing, photo and copy direction",
      "12 months of maintenance and priority support",
    ],
    delivery: "Agreed per project",
    edits: "Priority support",
  },
];

export const included = [
  "Mobile friendly and fast",
  "WhatsApp button",
  "Contact form that emails the firm",
  "Hosting set up for you",
  "Free .com or .com.ng domain for year one",
  "You own everything",
];

export const addOns = [
  { name: "Care Plan", price: "₦10,000 / month", detail: "Hosting, backups, small edits and security updates." },
  { name: "Extra page", price: "₦15,000 each", detail: "Add a page to any package." },
  { name: "Content writing", price: "₦5,000 / page", detail: "I write the copy from a short chat with you." },
  { name: "Firm email", price: "₦25,000 / year", detail: "Three professional mailboxes on your domain." },
];

// Switch `active` off once 20 firms have taken the offer.
export const launchOffer = {
  active: true,
  text: "Launch offer: the first 20 firms get 15% off any package and a free month of the Care Plan.",
};

export const steps = [
  { title: "Chat on WhatsApp", body: "Tell me about the firm, its lawyers and what clients ask you most." },
  { title: "Pick a package", body: "We agree on a package and I send a short invoice." },
  { title: "50% to start", body: "You pay half, send your details and photos, and I start building." },
  { title: "Review", body: "You see the site on a private link and send your edits." },
  { title: "Go live", body: "You pay the balance, the site goes live and everything is handed over to you." },
];

export const faqs = [
  {
    q: "Is a law firm website allowed under the NBA Rules of Professional Conduct?",
    a: "Yes. The Rules allow a firm to give clients factual information about itself. I keep the copy factual and avoid self-praise, comparisons with other firms and claims about case outcomes, which the Rules restrict.",
  },
  {
    q: "Who owns the website and the domain?",
    a: "You do. The domain is registered in the firm's name and I hand over every login when the site goes live.",
  },
  {
    q: "How do I pay?",
    a: "50% to start and 50% before the site goes live. You get an invoice for each payment.",
  },
  {
    q: "Do I have to write the content myself?",
    a: "No. Send me your practice areas and a few lines about the firm and I'll shape it. Full content writing is included in the SAN package and available as an add-on on the others.",
  },
  {
    q: "What if I need changes after the site is live?",
    a: "Small edits are covered by the Care Plan at ₦10,000 a month. Without it, I quote each change.",
  },
  {
    q: "We already have a Facebook or Instagram page. Do we still need a website?",
    a: "They work together. A website shows up on Google when someone searches the firm's name, and gives your social pages a link to point to.",
  },
  {
    q: "Can you also redesign our logo?",
    a: "Yes. Logo cleanup is part of the Chambers package and up, and a full logo refresh, letterheads and business cards can be quoted separately.",
  },
];

export const samples = [
  {
    href: "/lawyers/demo1",
    name: "Kestrel Chambers",
    kind: "Small chambers, one page",
    fits: "Brief and Chambers packages",
  },
  {
    href: "/lawyers/demo2",
    name: "Ashby Lane Partners",
    kind: "Mid-size firm, two offices",
    fits: "Counsel and Partner packages",
  },
];

export const quoteMessage = (tier?: string) =>
  tier
    ? `Hello Kim, I'm interested in the ${tier} website package for my law firm.`
    : "Hello Kim, I'd like a website for my law firm.";
