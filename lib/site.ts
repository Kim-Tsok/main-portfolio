export const site = {
  name: "Kim Tsok",
  fullName: "Kim Kelvin Tsok",
  role: "Product Engineer",
  description:
    "Kim Tsok is a product engineer based in Nigeria, building web products, client websites and games. Explore selected work, project stories and writing.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kimtsok.vercel.app",
  email: "tsokkim556@gmail.com",
  location: "Nigeria",
  // Set to a file in /public (e.g. "/kim-tsok-cv.pdf") to show the CV button.
  cvUrl: process.env.NEXT_PUBLIC_RESUME_URL || "/resume",
  bookingUrl: process.env.NEXT_PUBLIC_CAL_URL || null,
};

export const whatsappNumber = "2347016974707";

// WhatsApp click-to-chat link, optionally with a prefilled message.
export const waLink = (text?: string) =>
  `https://wa.me/${whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const socials = [
  { label: "GitHub", href: "https://github.com/Kim-Tsok" },
  { label: "Substack", href: "https://substack.com/@kimtsok" },
  { label: "X / Twitter", href: "https://x.com/im_telepathic" },
  { label: "Instagram", href: "https://www.instagram.com/im_telepathic" },
  { label: "YouTube", href: "https://www.youtube.com/@pixelbluegames" },
  { label: "WhatsApp", href: waLink() },
];

export const nav = [
  { id: "work", label: "Work" },
  { id: "about", label: "About & skills" },
  { id: "blog", label: "Blog" },
  { id: "elsewhere", label: "Beyond code" },
  { id: "contact", label: "Contact" },
];
