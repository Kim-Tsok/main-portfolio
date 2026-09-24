"use client";

import { ArrowUp, ArrowUpRight, Copy, Download } from "lucide-react";
import { toast } from "sonner";
import { site, socials } from "@/lib/site";
import Reveal from "./reveal";

export default function Contact() {
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      toast("Email copied to clipboard");
    } catch {
      toast("Couldn't copy. My email is " + site.email);
    }
  };

  return (
    <section id="contact" className="px-3 pb-3 md:px-4 md:pb-4">
      <div className="overflow-hidden rounded-[2rem] bg-brown-deep text-paper">
        <div className="container-page py-20 md:py-28">
          <Reveal>
              <h2 className="max-w-4xl text-4xl font-semibold leading-[1.05] text-white sm:text-6xl md:text-7xl">
              Have a project in mind?{" "}
              <span className="font-serif font-normal italic tracking-normal text-tan">
                Let&apos;s talk.
              </span>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/75">
              Tell me what you&apos;re building and where you want it to go. I&apos;ll get back to you with next steps.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-paper px-8 font-medium text-ink transition-colors hover:bg-white"
            >
              {site.email}
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-paper/25 px-6 font-medium text-paper transition-colors hover:border-paper/60"
            >
              <Copy className="size-4" />
              Copy email
            </button>
            {site.cvUrl && (
              <a
                href={site.cvUrl}
                download
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-paper/25 px-6 font-medium text-paper transition-colors hover:border-paper/60"
              >
                <Download className="size-4" />
                Download CV
              </a>
            )}
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="mt-20 grid grid-cols-2 border-t border-paper/15 sm:grid-cols-3 md:grid-cols-5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between border-b border-paper/15 py-5 pr-4 text-paper/80 transition-colors hover:text-white"
                  >
                    {s.label}
                    <ArrowUpRight className="size-4 text-tan transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <footer className="container-page">
          <div className="flex flex-col gap-4 border-t border-paper/15 py-8 text-sm text-paper/60 sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {new Date().getFullYear()} {site.fullName}
            </p>
            <a
              href="#top"
              className="inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              Back to top
              <ArrowUp className="size-4" />
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
