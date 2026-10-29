import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import PlayingDeck from "./playing-deck";

export default function Hero() {
  return <section className="intro playing-intro signature-intro" aria-labelledby="intro-title">
    <div className="intro-copy">
      <h1 id="intro-title" className="signature-headline">
        <span className="signature-greeting">Hey, I’m</span>{" "}
        <span className="signature-name"><span>KIM</span>{" "}<span>TSOK<span className="name-stop">.</span></span></span>{" "}
        <span className="signature-statement">I build products for the web.</span>
      </h1>
      <p className="signature-role">— Product engineer</p>
      <p className="intro-description">I work on what you see and what makes it work. Away from the editor, you’ll find me writing, making music, or out with a camera.</p>
      <div className="intro-actions"><a href={`mailto:${site.email}`} className="primary-button">Let’s make something <ArrowUpRight size={17} aria-hidden="true"/></a></div>
    </div>
    <PlayingDeck/>
  </section>;
}
