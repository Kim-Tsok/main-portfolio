"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Skill } from "@/lib/data";
import Reveal from "./reveal";

interface AboutProps {
  skills: Skill[];
  projectCount: number;
  clientCount: number;
}

export default function About({ skills, projectCount, clientCount }: AboutProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (skills.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % skills.length), 2600);
    return () => clearInterval(id);
  }, [skills.length]);

  const current = skills[index]?.name ?? "care";

  const facts = [
    { value: projectCount, label: "Projects built" },
    { value: clientCount, label: "Client builds" },
    { value: skills.length, label: "Core tools" },
  ];

  return (
    <section id="about" className="border-y border-line bg-paper/70 py-24 backdrop-blur-[2px] md:py-32">
      <div className="container-page">
        <Reveal>
          <h2 className="text-3xl font-semibold leading-tight text-ink md:text-5xl">
            Crafting experiences with{" "}
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="mt-2 inline-flex min-w-[9ch] justify-center overflow-hidden rounded-full bg-brown px-6 py-1 font-serif font-normal italic tracking-normal text-white md:mt-0 md:px-8"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={current}
                  initial={{ opacity: 0, y: "60%" }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: "-60%" }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  {current}
                </motion.span>
              </AnimatePresence>
            </motion.span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-14 md:mt-20 md:grid-cols-12 md:gap-10">
          <Reveal delay={0.1} className="md:col-span-6">
            <div className="space-y-5 text-lg leading-relaxed text-brown">
              <p>
                I&apos;m Kim, a front-end developer who cares about the details
                people feel but rarely notice: how fast a page loads, how a
                button responds, how text sits on the screen.
              </p>
              <p>
                I work mostly in React, Next.js and TypeScript, and I bring a
                designer&apos;s eye from my graphic and UI design work. Outside
                client projects I build tools, small games and experiments,
                which is where most of what I know comes from.
              </p>
            </div>

            <dl className="mt-10 grid grid-cols-3 border-t border-line pt-8">
              {facts.map((f) => (
                <div key={f.label} className="flex flex-col-reverse">
                  <dt className="mt-1 text-sm text-brown">{f.label}</dt>
                  <dd className="font-heading text-4xl font-semibold tabular-nums text-ink md:text-5xl">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.2} className="md:col-span-5 md:col-start-8">
            <figure className="rounded-3xl bg-brown-deep p-8 text-paper md:p-10">
              <span aria-hidden className="block h-10 font-serif text-7xl leading-none text-tan">
                &ldquo;
              </span>
              <blockquote className="font-serif text-xl leading-snug md:text-2xl">
                Kim Kelvin Tsok delivered a high-performance website that exceeded the
                initial scope for our event center. The site is fast,
                responsive, and handles our booking requirements with
                precision. His technical execution and attention to detail are
                top-tier.
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3 border-t border-paper/15 pt-6">
                <span className="grid size-10 place-items-center rounded-full bg-tan font-heading text-sm font-semibold text-white">
                  UG
                </span>
                <span className="text-sm">
                  <span className="block font-medium text-white">Usiju Gadzama</span>
                  <span className="text-paper/70">CEO, Usiju World Events</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
