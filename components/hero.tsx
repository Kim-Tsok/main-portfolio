"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
});

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-5 pb-24 pt-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(171_129_100/0.18),transparent)]"
      />

      <div className="relative text-center">
        <h1 className="text-[2.6rem] font-semibold leading-[1.02] text-ink sm:text-6xl md:text-7xl lg:text-8xl">
          <motion.span {...rise(0.1)} className="block">
            Hi, I&apos;m{" "}
            <span className="font-serif font-normal italic tracking-normal">
              Kim Tsok
            </span>
          </motion.span>
          <motion.span {...rise(0.2)} className="block">
            a front-end developer
          </motion.span>
        </h1>

        <motion.p
          {...rise(0.35)}
          className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-brown md:text-lg"
        >
          I design and build fast, polished websites with React and Next.js, for
          businesses that want to look as good online as they are offline.
        </motion.p>

        <motion.div
          {...rise(0.45)}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="#work"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-brown px-7 font-medium text-white transition-colors hover:bg-brown-deep"
          >
            See my work
            <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href={`mailto:${site.email}`}
            className="group inline-flex h-12 items-center gap-2 rounded-full border border-brown/40 px-7 font-medium text-brown transition-colors hover:border-brown hover:bg-brown/5"
          >
            Email me
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="container-page absolute inset-x-0 bottom-8 flex items-end justify-between text-xs text-brown/80 md:text-sm"
      >
        <span>Based in {site.location}, working worldwide</span>
        <span className="hidden sm:inline">React · Next.js · TypeScript</span>
      </motion.div>
    </section>
  );
}
