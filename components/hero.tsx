import PlayingDeck from "./playing-deck";

export default function Hero() {
  return <section className="intro playing-intro deck-only-intro" aria-labelledby="intro-title">
    <h1 id="intro-title" className="sr-only">Kim Tsok — product engineer, creative, and builder of web products.</h1>
    <PlayingDeck/>
  </section>;
}
