import PlayingDeck from "./playing-deck";
import Link from 'next/link';

export default function Hero() {
  return <section className="intro playing-intro deck-only-intro" aria-labelledby="intro-title">
    <h1 id="intro-title" className="sr-only">Kim Tsok — product engineer, creative, and builder of web products.</h1>
    <PlayingDeck/>
    <div className="hero-version-switch"><Link href="/simple" prefetch={false}>Simplified version</Link></div>
  </section>;
}
