export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  body: string;
};

// Site-native editorial content. These notes describe existing project features;
// they don't invent client results, user numbers, or a development history.
export const posts: Post[] = [
  {
    slug: "a-portfolio-with-a-few-wild-cards",
    title: "A portfolio with a few wild cards",
    excerpt: "Giving the work a clear place, and leaving room for the person behind it. A look at the playing-card idea behind this site.",
    category: "Design notes",
    publishedAt: "2026-10-29",
    body: `A portfolio has a fairly practical job. Someone arrives, looks at the work, and decides whether to get in touch. But a page of project screenshots doesn't say much about the person who made them.

This site makes room for both. The engineering projects come first. Games, music and writing have their own smaller place. The playing cards bring those different interests into the same visual language.

## Why a deck of cards?

Each card is a small introduction. The ace points to engineering work, the king to the person behind it, the queen to writing, and the joker to the other things that don't fit neatly into a job title.

They also work as objects. A card can sit in a stack, lift away from it, or move somewhere else. Those familiar movements give the animation a purpose people can recognise.

## Let the interaction do a job

The deck starts beside the introduction. Further down the page, those same cards become navigation. On a desktop they dock on the left; on a phone they sit along the bottom.

The point is to keep the sections within reach as the page gets longer. The suit alone isn't enough to explain a destination, so the small cards keep their text labels. The main navigation also offers a direct route to the work, about section and blog.

The background follows the same idea of keeping the personality near the introduction. Symbols brighten around the pointer in the opening section, then disappear from the rest of the page so the project stories have a quieter setting.

## Keep the work readable

Some projects need a longer explanation. Others are small experiments, and a few paragraphs are enough. The project pages support both, rather than filling every entry with the same headings and claims.

The card theme should make it easier to remember the site. The project descriptions still need to explain what each thing does, which parts are implemented, and where to try it.

## Leave room for the other interests

Music and games are part of the picture, even when they're not the reason someone is hiring. Blender belongs here as something I've dabbled in, rather than a service I'm selling.

That distinction matters. A portfolio can show curiosity without turning every interest into a professional claim.`
  },
  {
    slug: "capture-the-thought-first",
    title: "Capture the thought first",
    excerpt: "The idea behind Ellipsis: a place to keep the fragments before asking them to become organised notes.",
    category: "Product notes",
    publishedAt: "2026-10-29",
    body: `A shopping reminder, a sentence for something you're writing, an appointment, an idea for an app. They all need somewhere to go, but they don't arrive in the same format.

Ellipsis is built around capturing those fragments. In my public updates I've called them “pings”: small entries that can be saved before they're fully formed.

## The moment before organisation

A traditional note can ask for a title, a document, a folder or a place in a system. Sometimes that's useful. Sometimes the thought is only a few words long and the extra steps are enough to interrupt it.

The premise of Ellipsis is to get the thought down first. Connecting it to the other things you've saved, and bringing it back when it becomes useful, can happen after that.

That is the product direction behind the app. It isn't a claim that every saved fragment becomes useful, or that software can decide what matters to someone without their involvement.

## Reminders fit into the same flow

A deadline is often part of a sentence: something needs to happen tomorrow, or before a particular date. Ellipsis lets you type or say a deadline to set a reminder instead of building a separate planning system around it.

The capture step should stay close to how the thought appeared. A quick reminder and a longer idea can share a home without pretending they're the same kind of information.

## A product beyond its interface

The implementation uses Next.js, PostgreSQL on Neon, Better Auth and pgvector. Those pieces cover the web interface, stored information, accounts and vector search capabilities.

A stack list doesn't explain whether the experience feels good to use. The live app is a better place to assess that. The project page on this portfolio gives a shorter overview of what it does and links to the product.

## Keeping the idea small enough to explain

The clearest explanation is still the original one: a place for scattered thoughts. That gives the product a specific job without promising to organise an entire life.

You can explore [Ellipsis](https://tryellipsis.space/) or find the original short updates on [my Substack](https://substack.com/@kimtsok).`
  },
];

export const getPost = (slug: string) => posts.find(post => post.slug === slug);
export const readingMinutes = (body: string) => Math.max(1, Math.ceil(body.split(/\s+/).length / 200));
export const postDate = (date: string) => new Intl.DateTimeFormat("en", { month:"short", day:"numeric", year:"numeric", timeZone:"Africa/Lagos" }).format(new Date(`${date}T12:00:00Z`));
