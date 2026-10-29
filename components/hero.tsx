import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import PlayingDeck from "./playing-deck";

export default function Hero() {
  return <section className="intro playing-intro sentence-intro" aria-labelledby="intro-title">
    <div className="intro-copy">
      <h1 id="intro-title" className="sentence-headline">
        <span className="sentence-lead">Hey, I’m</span>{" "}
        <span className="sentence-name"><span>KIM</span>{" "}<span>TSOK<span className="name-stop">,</span></span></span>{" "}
        <span className="sentence-tail">and I build web products.</span>
      </h1>
      <p className="sentence-role">— Product engineer</p>
      <p className="intro-description">Interfaces, databases, and the bits in between. I also make games, write, and find my way around FL Studio.</p>
      <div className="intro-actions"><a href={`mailto:${site.email}`} className="primary-button">Let’s make something <ArrowUpRight size={17}/></a></div>
    </div>
    <PlayingDeck/>
  </section>;
}
