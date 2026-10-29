"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { LayoutGroup, motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Mail, RotateCcw } from "lucide-react";
import { site } from "@/lib/site";
import { useHomeEntrance } from "./home-entrance";
import { useSiteSettings } from "./settings-provider";

const cards = [
  { rank: "A", suit: "♠", name: "Kim Tsok", label: "Introduction", rail: "About", description: "", href: "#about", link: "About me", tone: "spade", motif: "portrait" },
  { rank: "J", suit: "♣", name: "Creative", label: "Creative", rail: "Beyond", description: "Games, music, photography, and a little Blender.", href: "#elsewhere", link: "Beyond code", tone: "club", motif: "joker" },
  { rank: "K", suit: "♦", name: "Projects", label: "Projects", rail: "Work", description: "My own products and websites built for clients.", href: "#work", link: "View projects", tone: "diamond", motif: "king" },
  { rank: "Q", suit: "♥", name: "Writing", label: "Writing", rail: "Blog", description: "Notes on building things. Essays on everything else.", href: "#blog", link: "Read the blog", tone: "heart", motif: "queen" },
];

function CardArt({ motif, suit }: { motif: string; suit: string }) {
  if (motif === "ace") return <div className="ace-illustration" aria-hidden="true"><span className="ace-orbit"/><span className="ace-suit">♠</span><span className="ace-initials">KT</span><span className="ace-star star-one">✧</span><span className="ace-star star-two">✧</span></div>;
  return <svg className="court-art" viewBox="0 0 200 170" fill="none" aria-hidden="true">
    <path d="M100 8 169 85 100 162 31 85Z" stroke="currentColor" opacity=".17"/>
    <path d="M100 22 155 85 100 148 45 85Z" stroke="currentColor" opacity=".27"/>
    {motif === "joker" ? <g stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="M62 77Q43 24 76 35L97 61Q108 6 128 32L135 72Q163 42 153 88L132 95H72Z" fill="currentColor" fillOpacity=".08"/><circle cx="73" cy="31" r="5"/><circle cx="126" cy="27" r="5"/><circle cx="155" cy="84" r="5"/><path d="M70 93Q73 136 101 137Q128 134 133 94M83 104h8m21 0h8m-30 14q12 12 23-1"/><path d="m78 137 21 14 25-15"/></g> : <g stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d={motif === "king" ? "m66 68-7-30 25 15L100 29l16 24 25-15-7 30Z" : "m66 68-4-23 25 10L100 34l13 21 25-10-4 23Z"} fill="currentColor" fillOpacity=".09"/><path d="M68 76h64M74 84v22q3 27 26 29 23-2 26-29V84M82 96h8m20 0h8m-24 18q6 4 12 0M78 134l-15 18m58-18 16 18"/><path d="M100 78v27h6" strokeWidth="1.3"/>{motif === "king" && <path d="m81 117 19 18 19-18M87 125v16m26-16v16"/>}</g>}
    <text x="30" y="25" fill="currentColor" fontSize="20">{suit}</text><text x="156" y="160" fill="currentColor" fontSize="20">{suit}</text>
  </svg>;
}

export default function PlayingDeck() {
  const { assetsReady, finished, finish } = useHomeEntrance();
  const settings = useSiteSettings();
  const [active, setActive] = useState(0);
  const [docked, setDocked] = useState(false);
  const [section, setSection] = useState("about");
  const [replaying, setReplaying] = useState(false);
  const [portraitFailed, setPortraitFailed] = useState(false);
  const reduced = useReducedMotion();
  const controls = useAnimationControls();
  const backControls = useAnimationControls();
  const stage = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const busy = !finished || replaying;

  const fanned = (index: number, frontIndex = active) => {
    const depth = (index - frontIndex + cards.length) % cards.length;
    return { x: depth * 8 - 16, y: depth * -5, rotate: depth === 0 ? -6 : depth * 5 - 3 };
  };

  useEffect(() => {
    if (!assetsReady) return;
    let cancelled = false;
    const skip = window.matchMedia("(prefers-reduced-motion: reduce)").matches || Boolean(window.location.hash && window.location.hash !== "#top");
    const open = (index: number) => {
      const depth = index;
      return { x: depth * 8 - 16, y: depth * -5, rotate: depth === 0 ? -6 : depth * 5 - 3 };
    };
    async function deal() {
      if (skip) {
        controls.set(open);
        backControls.set({ x: 30, y: -5, rotate: 19 });
      } else {
        controls.set({ x: 0, y: -window.innerHeight - 520, rotate: -12 });
        await controls.start((index: number) => ({ x: 0, y: 0, rotate: 0,
          transition: { duration: .68, delay: .15 + (cards.length - 1 - index) * .13, ease: [.32, 0, .67, 1] } }));
        if (cancelled) return;
        await Promise.all([
          controls.start((index: number) => ({ ...open(index), transition: { type: "spring", stiffness: 145, damping: 23 } })),
          backControls.start({ x: 30, y: -5, rotate: 19, transition: { type: "spring", stiffness: 145, damping: 23 } }),
        ]);
      }
      if (!cancelled) finish();
    }
    void deal();
    return () => { cancelled = true; controls.stop(); backControls.stop(); };
  }, [assetsReady, controls, backControls, finish]);

  useEffect(() => {
    if (!finished || replaying) return;
    void controls.start((index: number) => {
      const depth = (index - active + cards.length) % cards.length;
      return { x: depth * 8 - 16, y: depth * -5, rotate: depth === 0 ? -6 : depth * 5 - 3,
        transition: reduced ? { duration: 0 } : { type: "spring", stiffness: 170, damping: 25 } };
    });
  }, [active, finished, replaying, reduced, controls, docked]);

  useEffect(() => {
    if (!finished || replaying) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!stage.current) return;
      // The original space stays in flow while the cards become navigation.
      setDocked(stage.current.getBoundingClientRect().bottom < 100);
      let current = "about";
      for (const id of ["work", "about", "blog", "elsewhere", "contact"]) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= window.innerHeight * .4) current = id;
      }
      setSection(current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => { window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); cancelAnimationFrame(frame); };
  }, [finished, replaying]);

  const change = (step: number) => { if (!busy) setActive(index => (index + step + cards.length) % cards.length); };
  async function replay() {
    if (busy) return;
    setReplaying(true);
    setActive(0);
    if (!reduced) {
      controls.set({ x: 0, y: -window.innerHeight - 520, rotate: -12 });
      backControls.set({ x: 0, y: 0, rotate: 0 });
      await controls.start((index: number) => ({ x: 0, y: 0, rotate: 0, transition: { duration: .68, delay: (cards.length - 1 - index) * .13, ease: [.32, 0, .67, 1] } }));
      await backControls.start({ x: 30, y: -5, rotate: 19, transition: { duration: .3 } });
    }
    setReplaying(false);
  }

  return <LayoutGroup id="portfolio-deck">
    <div className={`deck-experience${docked ? " is-docked" : ""}`} ref={stage} onKeyDown={event => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); change(event.key === "ArrowRight" ? 1 : -1); }
    }}>
      <div className="deck-stage" role="group" aria-roledescription="carousel" aria-label="Portfolio cards" tabIndex={busy ? -1 : 0}
        onTouchStart={event => { touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }}
        onTouchCancel={() => { touch.current = null; }}
        onTouchEnd={event => {
          if (!touch.current) return;
          const x = event.changedTouches[0].clientX - touch.current.x;
          const y = event.changedTouches[0].clientY - touch.current.y;
          if (Math.abs(x) > 45 && Math.abs(x) > Math.abs(y) * 1.2) change(x < 0 ? 1 : -1);
          touch.current = null;
        }}>
        <motion.div className="deck-back" initial={{ x: 0, y: 0, rotate: 0 }} animate={backControls} aria-hidden="true"><div className="card-back-border"><span>KT</span></div></motion.div>
        {!docked && cards.map((card, index) => {
          const depth = (index - active + cards.length) % cards.length;
          const front = depth === 0;
          return <motion.article key={card.tone} custom={index} layoutId={reduced ? undefined : `card-${index}`} className={`playing-card suit-${card.tone}${index === 0 ? " introduction-card" : ""}`}
            style={{ zIndex: 10 - depth }} initial={finished ? fanned(index) : { x: 0, y: -1200, rotate: -12 }} animate={controls}
            whileHover={front && !busy && !reduced ? { y: -8, rotate: -4, transition: { duration: .2 } } : undefined}>
            {!front && <button type="button" className="draw-card-target" disabled={busy} onClick={() => setActive(index)} aria-label={`Draw ${card.label} card`}/>}
            <div className="card-face-content" aria-hidden={!front} inert={!front}>
              <div className="card-corner corner-top" aria-hidden="true"><span>{card.rank}</span><span>{card.suit}</span></div>
              <div className="card-corner corner-bottom" aria-hidden="true"><span>{card.rank}</span><span>{card.suit}</span></div>
              <div className="card-inner-frame">
                {index === 0 ? <>
                  <div className="intro-card-portrait">{portraitFailed ? <span aria-label="Kim Tsok">KT</span> : <Image data-deck-portrait src={settings.intro_photo_url} alt={settings.intro_photo_alt} width={80} height={80} loading="eager" unoptimized onError={() => setPortraitFailed(true)}/>}</div>
                  <h2 className="intro-card-name">KIM<br/>TSOK<span>.</span></h2>
                  <p className="intro-card-role">Product engineer</p>
                  <p className="card-description">{settings.intro_description}</p>
                </> : <><CardArt motif={card.motif} suit={card.suit}/><h2>{card.name}</h2><p className="card-description">{card.description}</p></>}
                <div className="card-links"><a href={card.href} className="card-action">{card.link}<ArrowUpRight size={14} aria-hidden="true"/></a>{index === 0 && <a className="intro-card-email" href={`mailto:${site.email}`} aria-label="Email Kim"><Mail size={16}/></a>}</div>
                <div className="card-flourish" aria-hidden="true">— {card.suit} —</div>
              </div>
            </div>
          </motion.article>;
        })}
      </div>
      <div className="deck-controls" inert={docked}>
        <button type="button" disabled={busy} onClick={() => change(-1)} aria-label="Previous card"><ArrowLeft size={17}/></button>
        <p className="deck-count" aria-live="polite" aria-atomic="true"><span className="sr-only">{cards[active].label}, card </span>{active + 1}<span aria-hidden="true"> / {cards.length}</span><span className="sr-only"> of {cards.length}</span></p>
        <button type="button" disabled={busy} onClick={() => change(1)} aria-label="Next card"><ArrowRight size={17}/></button>
        <button type="button" disabled={busy} className="redeal-button" onClick={() => void replay()} aria-label="Replay the card entrance"><RotateCcw size={16}/></button>
      </div>
    </div>
    {docked && <motion.nav layoutRoot className="card-navigation" aria-label="Page sections" initial={false}>
      <a className="rail-home" href="#top" aria-label="Back to top">kt<span aria-hidden="true">↑</span></a>
      {cards.map((card, index) => <motion.a key={card.tone} layoutId={reduced ? undefined : `card-${index}`} href={card.href} aria-label={index === 1 ? "Beyond code" : undefined}
        aria-current={section === card.href.slice(1) ? "location" : undefined} className={`navigation-card suit-${card.tone}`} initial={false}
        transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 180, damping: 27 }} style={{ zIndex: 20 - index }}>
        <span className="nav-card-rank" aria-hidden="true">{card.rank}<span>{card.suit}</span></span><span className="nav-card-suit" aria-hidden="true">{card.suit}</span><span className="nav-card-label">{card.rail}</span>
      </motion.a>)}
      <a className="rail-contact" href="#contact" aria-current={section === "contact" ? "location" : undefined}>Let’s talk<span aria-hidden="true">↗</span></a>
    </motion.nav>}
  </LayoutGroup>;
}
