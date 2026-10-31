"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Link from 'next/link';
import { AnimatePresence, motion } from "framer-motion";

const EntranceContext = createContext({ assetsReady: true, finished: true, finish: () => {} });
export const useHomeEntrance = () => useContext(EntranceContext);

export function DeckLoader() {
  return <div className="deck-loader" role="status" aria-live="polite">
    <div className="loader-cards" aria-hidden="true"><span>♣</span><span>♦</span><span>♠</span></div>
    <p>Dealing you in<span aria-hidden="true">…</span></p>
    <Link href="/simple" prefetch={false} className="loader-simple-link">Simplified version</Link>
  </div>;
}

export default function HomeEntrance({ children }: { children: React.ReactNode }) {
  const [assetsReady, setAssetsReady] = useState(false);
  const [finished, setFinished] = useState(false);
  const content = useRef<HTMLDivElement>(null);
  const finish = useCallback(() => setFinished(true), []);

  useEffect(() => {
    let cancelled = false;
    let timeout: ReturnType<typeof setTimeout>;
    const images = Array.from(content.current?.querySelectorAll<HTMLImageElement>("[data-deck-portrait]") ?? []);
    // These are the assets used by the cards, not every image further down the page.
    const ready = Promise.allSettled([document.fonts.ready, ...images.map(image => image.decode())]);
    const fallback = new Promise<void>(resolve => { timeout = setTimeout(resolve, 4500); });
    Promise.race([ready, fallback]).then(() => {
      clearTimeout(timeout);
      if (!cancelled) setAssetsReady(true);
    });
    return () => { cancelled = true; clearTimeout(timeout); };
  }, []);

  useEffect(() => {
    const element = content.current;
    const previousOverflow = document.body.style.overflow;
    if (!finished) document.body.style.overflow = "hidden";
    if (element) element.inert = !finished;
    return () => {
      document.body.style.overflow = previousOverflow;
      if (element) element.inert = false;
    };
  }, [finished]);

  useEffect(() => {
    if (!assetsReady || finished) return;
    // Interrupted animations must never leave the rest of the site inert.
    const timeout = setTimeout(finish, 3500);
    return () => clearTimeout(timeout);
  }, [assetsReady, finished, finish]);

  return <EntranceContext.Provider value={{ assetsReady, finished, finish }}>
    <div className="home-entrance" data-assets-ready={assetsReady} aria-busy={!finished}>
      <div className="entrance-content" ref={content}>{children}</div>
      <AnimatePresence>{!assetsReady && <motion.div className="entrance-overlay" key="loader" exit={{ opacity: 0 }} transition={{ duration: .2 }}><DeckLoader/></motion.div>}</AnimatePresence>
      <noscript><style>{`.home-entrance .entrance-content{visibility:visible!important}.entrance-overlay{display:none!important}.deck-only-intro .playing-card{transform:none!important}`}</style></noscript>
    </div>
  </EntranceContext.Provider>;
}
