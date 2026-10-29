import type { Project } from "./data";

// Editorial drafts use only the existing portfolio and Kim's public posts.
// A published article in the CMS takes precedence over these starting points.
const stories: Record<string, { title: string; summary: string; category: string; article: string }> = {
  "ellipsis-a-calm-place-for-busy-minds": {
    title: "Ellipsis", category: "Personal product",
    summary: "A notes app for the thoughts that arrive before you have time to organise them.",
    article: `## Thoughts don't arrive in folders

Ellipsis started with a familiar problem: an idea, a deadline or something to remember turns up while you're doing something else. Capturing it should take less effort than deciding where to put it.

The app is a place for those fragments. Add a thought while it is still half formed. Ellipsis connects it to the other things you've saved and helps bring it back when it becomes useful.

## Capture first, organise later

In my public updates, I've described these little entries as “pings”: groceries, an appointment, a random idea. They don't need to become a carefully formatted document before they're worth keeping.

That approach also extends to reminders. You can type or say a deadline rather than set up a planner around it. The product is built around getting a thought down and returning to it later.

## What it's built with

Ellipsis uses Next.js, PostgreSQL on Neon, Better Auth and pgvector. The interface, account system and stored notes are parts of the same product, rather than an isolated frontend demo.

The live app is linked below. For a feel for what I've been building, my Substack and Twitter also have short updates about the product.`
  },
  "usiju-event-centre": {
    title: "Usiju Event Centre", category: "Client work",
    summary: "A venue website with a booking flow and email notifications for an event centre.",
    article: `## A website with a job to do

Usiju Event Centre needed a place to present the venue and support booking enquiries. The site brings that information and the booking flow together, so a visitor can move from looking around to getting in touch.

This is client work: the website serves an existing business, with its own services and customers. The pages introduce the venue, while the booking system gives an interested visitor a next step.

## Beyond the showcase

A venue website needs more than a collection of attractive images. The booking flow is part of the experience, and email notifications keep people informed after they use it.

The implementation uses Next.js and Supabase, with Resend for email. Tailwind CSS and shadcn/ui support the interface.

## See the result

The live website is the best place to explore the pages and the booking experience. This writeup describes the delivered features; it doesn't attach conversion or revenue claims to them without supporting data.`
  },
  "scriblr-legacy": {
    title: "Scriblr (Legacy)", category: "Personal product",
    summary: "An early version of a platform bringing writers, readers and publishers together.",
    article: `## Making room for writers

Scriblr comes from my interest in writing as well as software. The idea is to bring writers, readers and publishers into the same place, so people can publish work and discover something to read.

The version documented here is the legacy React and Tailwind implementation. I'm keeping that label because an early version of a product deserves context: it shows a point in its development, rather than everything the product may become.

## The question behind the product

In a later public post about Scriblr, I described a reading platform where finishing a book matters more than the author's follower count. That is the direction behind the project: giving the work itself a chance to find readers.

That later direction shouldn't be confused with a feature inventory for this legacy build. The source and demo below show what this particular version contains.`
  },
  "over-the-gear": {
    title: "Over the Gear", category: "Game jam",
    summary: "A Unity game about a guy called Cog and some very inconvenient gear teeth.",
    article: `## Meet Cog

You're a guy named Cog. You've fallen into a clock or a factory, somehow, and now you have to jump over the gear teeth. The precise explanation is not a major feature of the game.

Over the Gear was made for the GMTK Game Jam using Unity and C#. As you progress, Cog meets a few friends while trying to avoid his impending doom.

## A different kind of project

I like making games alongside web development. This one is a small, playable experiment with a very direct premise. You can try it on itch.io or explore the source below.`
  },
  "gladys": {
    title: "Gladys", category: "Terminal game",
    summary: "A branching adventure played entirely in your terminal, written in Python.",
    article: `## A story you play in a terminal

Gladys is a text-based, choose-your-own-adventure game. You read, make a choice and follow the branch it opens. Some choices move you forward; others bring the story to an early end.

It's written in Python and runs in the terminal. There isn't a rendered world to explore: the writing and the decisions carry the game.

The repository and release download are linked below if you'd like to play or read the code.`
  },
  "genie": {
    title: "Genie", category: "Developer tool",
    summary: "A small browser workspace for writing HTML, CSS and JavaScript with an immediate preview.",
    article: `## Write something. See it run.

Genie is an online editor for HTML, CSS and JavaScript. It puts the code and its output in the same workspace, so you can try a change and see what it does immediately.

The scope is intentionally small: a place to test an idea without setting up a separate project. The editor itself uses HTML, JavaScript and Tailwind CSS.

You can open the live version or look through the source below.`
  },
  "mist": {
    title: "Mist", category: "Web experiment",
    summary: "A weather app using OpenWeather to look up current conditions in cities around the world.",
    article: `## A small weather app

Mist uses the OpenWeather API to display current weather for cities around the world. It's a straightforward web project built with HTML, JavaScript, Tailwind CSS and daisyUI.

I'm keeping some of these smaller projects alongside the larger products. They show the individual things I've explored, without needing to turn each one into a long case study.`
  },
  "julz-beauty-fashion-store": {
    title: "Julz Beauty & Fashion", category: "Client work",
    summary: "A React website introducing a beauty and fashion business, its services and location.",
    article: `## A home for the business

This client website introduces Julz Beauty & Fashion Store and its services. Visitors can find the location and contact information without having to piece them together from social posts.

The project uses React and Tailwind CSS. Its scope is a business showcase and a route to getting in touch, rather than an online checkout.`
  },
  "omlit": {
    title: "Omlit", category: "Frontend concept",
    summary: "A frontend concept exploring how people could share and sell surplus food locally.",
    article: `## A concept around surplus food

Omlit explores a local marketplace for food that would otherwise go to waste. The idea is that someone with extra food could make it available to another person nearby.

This project is a frontend mockup built with HTML, JavaScript and Tailwind CSS. It illustrates the idea and the interface; it isn't presented as an operating marketplace or a solution with measured impact.`
  },
};

export function projectStory(project: Project) {
  const story = stories[project.slug];
  return {
    title: project.title,
    summary: project.summary ?? story?.summary ?? project.description,
    category: story?.category ?? (project.tech_stack.includes("Client") ? "Client work" : "Personal project"),
    article: project.article != null ? (project.article || project.description) : (story?.article || project.description),
  };
}

export const writing = [
  { title: "Nigeria Is Still Waiting on 2006", description: "Following a repeated statistic back to its source, and the questions it left me with.", href: "https://kimtsok.substack.com/p/nigeria-is-still-waiting-on-2006", kind: "Essay", date: "August 10, 2026" },
  { title: "Building a place for scattered thoughts", description: "A short update on Ellipsis, and why I started building it.", href: "https://substack.com/@kimtsok/note/c-338111920", kind: "Build note", date: "September 16, 2026" },
];
