"use client";

import { useState, useRef, useEffect } from "react";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Shuffle } from "lucide-react";

const cards = [
  { rank: "A", suit: "♠", name: "The engineer", label: "Products", subtitle: "Ideas into working software.", description: "Web products, interfaces, and the systems behind them.", href: "#work", link: "Explore my work", tone: "spade", motif: "ace" },
  { rank: "K", suit: "♦", name: "The collaborator", label: "About me", subtitle: "Something we can build together.", description: "Websites for real businesses, built around what they need.", href: "#about", link: "A little about me", tone: "diamond", motif: "king" },
  { rank: "Q", suit: "♥", name: "The writer", label: "Writing", subtitle: "There’s more than code in here.", description: "Essays, observations, and notes from whatever I’m making.", href: "#blog", link: "Read the blog", tone: "heart", motif: "queen" },
  { rank: "★", suit: "♣", name: "The wild card", label: "Beyond code", subtitle: "A few other sides of me.", description: "Games, music, and a little curiosity about 3D.", href: "#elsewhere", link: "The other stuff", tone: "club", motif: "joker" },
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
  const [active, setActive] = useState(0);
  const [deal, setDeal] = useState(0);
  const reduced = useReducedMotion();
  const [docked, setDocked] = useState(false);
  const [section, setSection] = useState("work");
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!stage.current) return;
      const rect = stage.current.getBoundingClientRect();
      // Leave the original space in flow, so docking cannot shift the page.
      setDocked(rect.bottom < 100);
      const ids = ["work", "about", "blog", "elsewhere", "contact"];
      let current = "work";
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= window.innerHeight * .4) current = id;
      }
      setSection(current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive:true });
    window.addEventListener("resize", schedule);
    return () => { window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); cancelAnimationFrame(frame); };
  }, []);
  const touch = useRef<number | null>(null);
  const [hasDealt, setHasDealt] = useState(false);
  const change = (step: number) => setActive(index => (index + step + cards.length) % cards.length);
  return <LayoutGroup id="portfolio-deck"><div className={`deck-experience${docked ? " is-docked" : ""}`} ref={stage}>
    <div className="deck-caption"><span className="tiny-suit" aria-hidden="true">♠ ♥ ♣ ♦</span><span>The personal collection</span></div>
    <div className="deck-stage" onTouchStart={e => { touch.current = e.touches[0].clientX; }} onTouchEnd={e => { if (touch.current === null) return; const distance=e.changedTouches[0].clientX-touch.current; if(Math.abs(distance)>45) change(distance<0?1:-1); touch.current=null; }}>
      <div className="deck-back" aria-hidden="true"><div className="card-back-border"><span>KT</span><small>KIM TSOK / THE PERSONAL COLLECTION</small></div></div>
      {!docked && cards.map((card, index) => {
        const depth = (index - active + cards.length) % cards.length;
        const front = depth === 0;
        return <motion.article key={`${index}-${deal}`} layoutId={reduced ? undefined : `card-${index}`} layout={!reduced} className={`playing-card suit-${card.tone}`} style={{ zIndex: 10-depth }}
          onAnimationComplete={()=>{setHasDealt(true);}}
          initial={reduced || hasDealt ? false : { x:130+index*20, y:30, rotate:48+index*13, opacity:0 }}
          animate={{ x: depth*12-26, y: depth*-5, rotate:front?-8:depth*6-4, opacity:1 }}
          transition={{ type:"spring", stiffness:125, damping:19, delay:deal===0? index*.09: index*.04 }}
          whileHover={front && !reduced ? { y:-9, rotate:-5, transition:{delay:0,duration:.25} } : undefined}>
          {!front && <button type="button" className="draw-card-target" onClick={()=>setActive(index)} aria-label={`Draw ${card.label} card`}/>}
          <div className="card-face-content" aria-hidden={!front}>
            <div className="card-corner corner-top"><span>{card.motif === "joker" ? "J" : card.rank}</span><span>{card.suit}</span></div>
            <div className="card-corner corner-bottom"><span>{card.motif === "joker" ? "J" : card.rank}</span><span>{card.suit}</span></div>
            <div className="card-inner-frame"><div className="card-edition">{card.motif === "joker" ? "Joker / a personal collection" : `${card.rank === "A" ? "Ace" : card.rank === "K" ? "King" : "Queen"} of ${card.tone === "spade" ? "spades" : card.tone === "diamond" ? "diamonds" : "hearts"}`}</div><CardArt motif={card.motif} suit={card.suit}/><h2>{card.name}</h2><p className="card-subtitle">{card.subtitle}</p><p className="card-description">{card.description}</p><a href={card.href} tabIndex={front?0:-1} className="card-action">{card.link}<ArrowUpRight size={14}/></a><div className="card-flourish" aria-hidden="true">— {card.suit} —</div></div>
          </div>
        </motion.article>;
      })}
    </div>
    <div className="deck-controls" inert={docked}><button type="button" onClick={()=>change(-1)} aria-label="Previous card"><ArrowLeft size={16}/></button><p aria-live="polite" aria-atomic="true">{cards[active].label}<span> {active+1} / 4</span></p><button type="button" onClick={()=>change(1)} aria-label="Next card"><ArrowRight size={16}/></button><button type="button" className="redeal-button" onClick={()=>{setHasDealt(false);setDeal(d=>d+1);change(1);}} aria-label="Deal the cards again"><Shuffle size={15}/></button></div>
    <p className="deck-instruction" aria-hidden={docked}>Four cards. A few ways to get to know me.</p>
  </div>
  {docked && <motion.nav layoutRoot className="card-navigation" aria-label="Page sections" initial={false}>
    <a className="rail-home" href="#top" aria-label="Back to top">kt<span aria-hidden="true">↑</span></a>
    {cards.map((card,index) => <motion.a key={index} layoutId={reduced ? undefined : `card-${index}`} href={card.href}
      aria-label={index===3?"Beyond code":undefined}
      aria-current={section===card.href.slice(1)?"location":undefined}
      className={`navigation-card suit-${card.tone}`} initial={false}
      transition={{type:"spring",stiffness:180,damping:27,duration:reduced?0:undefined}}
      style={{zIndex:20-index}}>
      <span className="nav-card-rank" aria-hidden="true">{card.motif==="joker"?"J":card.rank}<span>{card.suit}</span></span>
      <span className="nav-card-suit" aria-hidden="true">{card.suit}</span>
      <span className="nav-card-label">{index===0?"Work":index===1?"About":index===2?"Blog":"Beyond"}</span>
    </motion.a>)}
    <a className="rail-contact" href="#contact" aria-current={section==="contact"?"location":undefined}>Let’s talk<span aria-hidden="true">↗</span></a>
  </motion.nav>}
  </LayoutGroup>;
}
