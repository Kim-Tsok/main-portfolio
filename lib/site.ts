export const site = {
  name: "Kim Tsok",
  fullName: "Kim Kelvin Tsok",
  role: "Front-End Developer",
  description:
    "Kim Tsok is a front-end developer building modern, high-performance web experiences with React and Next.js.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "tsokkim556@gmail.com",
  location: "Nigeria",
  // Set to a file in /public (e.g. "/kim-tsok-cv.pdf") to show the CV button.
  cvUrl: null as string | null,
};

export const socials = [
  { label: "GitHub", href: "https://github.com/Kim-Tsok" },
  { label: "X / Twitter", href: "https://x.com/im_telepathic" },
  { label: "Instagram", href: "https://www.instagram.com/im_telepathic" },
  { label: "YouTube", href: "https://www.youtube.com/@pixelbluegames" },
  { label: "WhatsApp", href: "https://wa.me/2349139998904" },
];

export const nav = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];
