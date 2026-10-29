BEGIN;
INSERT INTO public.blog_posts(slug,title,excerpt,category,body,published,published_at) VALUES('a-portfolio-with-a-few-wild-cards','A portfolio with a few wild cards','Giving the work a clear place, and leaving room for the person behind it. A look at the playing-card idea behind this site.','Design notes','A portfolio has a fairly practical job. Someone arrives, looks at the work, and decides whether to get in touch. But a page of project screenshots doesn''t say much about the person who made them.

This site makes room for both. The engineering projects come first. Games, music and writing have their own smaller place. The playing cards bring those different interests into the same visual language.

## Why a deck of cards?

Each card is a small introduction. The ace points to engineering work, the king to the person behind it, the queen to writing, and the joker to the other things that don''t fit neatly into a job title.

They also work as objects. A card can sit in a stack, lift away from it, or move somewhere else. Those familiar movements give the animation a purpose people can recognise.

## Let the interaction do a job

The deck starts beside the introduction. Further down the page, those same cards become navigation. On a desktop they dock on the left; on a phone they sit along the bottom.

The point is to keep the sections within reach as the page gets longer. The suit alone isn''t enough to explain a destination, so the small cards keep their text labels. The main navigation also offers a direct route to the work, about section and blog.

The background follows the same idea of keeping the personality near the introduction. Symbols brighten around the pointer in the opening section, then disappear from the rest of the page so the project stories have a quieter setting.

## Keep the work readable

Some projects need a longer explanation. Others are small experiments, and a few paragraphs are enough. The project pages support both, rather than filling every entry with the same headings and claims.

The card theme should make it easier to remember the site. The project descriptions still need to explain what each thing does, which parts are implemented, and where to try it.

## Leave room for the other interests

Music and games are part of the picture, even when they''re not the reason someone is hiring. Blender belongs here as something I''ve dabbled in, rather than a service I''m selling.

That distinction matters. A portfolio can show curiosity without turning every interest into a professional claim.',true,'2026-10-29') ON CONFLICT(slug) DO NOTHING;
INSERT INTO public.blog_posts(slug,title,excerpt,category,body,published,published_at) VALUES('capture-the-thought-first','Capture the thought first','The idea behind Ellipsis: a place to keep the fragments before asking them to become organised notes.','Product notes','A shopping reminder, a sentence for something you''re writing, an appointment, an idea for an app. They all need somewhere to go, but they don''t arrive in the same format.

Ellipsis is built around capturing those fragments. In my public updates I''ve called them “pings”: small entries that can be saved before they''re fully formed.

## The moment before organisation

A traditional note can ask for a title, a document, a folder or a place in a system. Sometimes that''s useful. Sometimes the thought is only a few words long and the extra steps are enough to interrupt it.

The premise of Ellipsis is to get the thought down first. Connecting it to the other things you''ve saved, and bringing it back when it becomes useful, can happen after that.

That is the product direction behind the app. It isn''t a claim that every saved fragment becomes useful, or that software can decide what matters to someone without their involvement.

## Reminders fit into the same flow

A deadline is often part of a sentence: something needs to happen tomorrow, or before a particular date. Ellipsis lets you type or say a deadline to set a reminder instead of building a separate planning system around it.

The capture step should stay close to how the thought appeared. A quick reminder and a longer idea can share a home without pretending they''re the same kind of information.

## A product beyond its interface

The implementation uses Next.js, PostgreSQL on Neon, Better Auth and pgvector. Those pieces cover the web interface, stored information, accounts and vector search capabilities.

A stack list doesn''t explain whether the experience feels good to use. The live app is a better place to assess that. The project page on this portfolio gives a shorter overview of what it does and links to the product.

## Keeping the idea small enough to explain

The clearest explanation is still the original one: a place for scattered thoughts. That gives the product a specific job without promising to organise an entire life.

You can explore [Ellipsis](https://tryellipsis.space/) or find the original short updates on [my Substack](https://substack.com/@kimtsok).',true,'2026-10-29') ON CONFLICT(slug) DO NOTHING;
UPDATE public.projects SET slug=COALESCE(slug,'over-the-gear'),summary=COALESCE(summary,'A Unity game about a guy called Cog and some very inconvenient gear teeth.'),article=COALESCE(article,'## Meet Cog

You''re a guy named Cog. You''ve fallen into a clock or a factory, somehow, and now you have to jump over the gear teeth. The precise explanation is not a major feature of the game.

Over the Gear was made for the GMTK Game Jam using Unity and C#. As you progress, Cog meets a few friends while trying to avoid his impending doom.

## A different kind of project

I like making games alongside web development. This one is a small, playable experiment with a very direct premise. You can try it on itch.io or explore the source below.') WHERE id='b8f31caf-8c8b-4213-b746-a29403ea74f4';
UPDATE public.projects SET slug=COALESCE(slug,'scriblr-legacy'),summary=COALESCE(summary,'An early version of a platform bringing writers, readers and publishers together.'),article=COALESCE(article,'## Making room for writers

Scriblr comes from my interest in writing as well as software. The idea is to bring writers, readers and publishers into the same place, so people can publish work and discover something to read.

The version documented here is the legacy React and Tailwind implementation. I''m keeping that label because an early version of a product deserves context: it shows a point in its development, rather than everything the product may become.

## The question behind the product

In a later public post about Scriblr, I described a reading platform where finishing a book matters more than the author''s follower count. That is the direction behind the project: giving the work itself a chance to find readers.

That later direction shouldn''t be confused with a feature inventory for this legacy build. The source and demo below show what this particular version contains.') WHERE id='ea1f3dca-526c-4720-a936-ee0f00949299';
UPDATE public.projects SET slug=COALESCE(slug,'omlit'),summary=COALESCE(summary,'A frontend concept exploring how people could share and sell surplus food locally.'),article=COALESCE(article,'## A concept around surplus food

Omlit explores a local marketplace for food that would otherwise go to waste. The idea is that someone with extra food could make it available to another person nearby.

This project is a frontend mockup built with HTML, JavaScript and Tailwind CSS. It illustrates the idea and the interface; it isn''t presented as an operating marketplace or a solution with measured impact.') WHERE id='8002a482-0f17-4203-a2cd-064c3474d48c';
UPDATE public.projects SET slug=COALESCE(slug,'gladys'),summary=COALESCE(summary,'A branching adventure played entirely in your terminal, written in Python.'),article=COALESCE(article,'## A story you play in a terminal

Gladys is a text-based, choose-your-own-adventure game. You read, make a choice and follow the branch it opens. Some choices move you forward; others bring the story to an early end.

It''s written in Python and runs in the terminal. There isn''t a rendered world to explore: the writing and the decisions carry the game.

The repository and release download are linked below if you''d like to play or read the code.') WHERE id='57d9d6fb-137f-438d-b162-76a110958c16';
UPDATE public.projects SET slug=COALESCE(slug,'julz-beauty-fashion-store'),summary=COALESCE(summary,'A React website introducing a beauty and fashion business, its services and location.'),article=COALESCE(article,'## A home for the business

This client website introduces Julz Beauty & Fashion Store and its services. Visitors can find the location and contact information without having to piece them together from social posts.

The project uses React and Tailwind CSS. Its scope is a business showcase and a route to getting in touch, rather than an online checkout.') WHERE id='64b73781-f063-49f2-87da-92860d0b6a50';
UPDATE public.projects SET slug=COALESCE(slug,'usiju-event-centre'),summary=COALESCE(summary,'A venue website with a booking flow and email notifications for an event centre.'),article=COALESCE(article,'## A website with a job to do

Usiju Event Centre needed a place to present the venue and support booking enquiries. The site brings that information and the booking flow together, so a visitor can move from looking around to getting in touch.

This is client work: the website serves an existing business, with its own services and customers. The pages introduce the venue, while the booking system gives an interested visitor a next step.

## Beyond the showcase

A venue website needs more than a collection of attractive images. The booking flow is part of the experience, and email notifications keep people informed after they use it.

The implementation uses Next.js and Supabase, with Resend for email. Tailwind CSS and shadcn/ui support the interface.

## See the result

The live website is the best place to explore the pages and the booking experience. This writeup describes the delivered features; it doesn''t attach conversion or revenue claims to them without supporting data.') WHERE id='4f91067d-d21e-4dbe-887d-75c40c24e232';
UPDATE public.projects SET slug=COALESCE(slug,'genie'),summary=COALESCE(summary,'A small browser workspace for writing HTML, CSS and JavaScript with an immediate preview.'),article=COALESCE(article,'## Write something. See it run.

Genie is an online editor for HTML, CSS and JavaScript. It puts the code and its output in the same workspace, so you can try a change and see what it does immediately.

The scope is intentionally small: a place to test an idea without setting up a separate project. The editor itself uses HTML, JavaScript and Tailwind CSS.

You can open the live version or look through the source below.') WHERE id='d7a6e1d2-e014-47a3-af73-94e66a824ecb';
UPDATE public.projects SET slug=COALESCE(slug,'mist'),summary=COALESCE(summary,'A weather app using OpenWeather to look up current conditions in cities around the world.'),article=COALESCE(article,'## A small weather app

Mist uses the OpenWeather API to display current weather for cities around the world. It''s a straightforward web project built with HTML, JavaScript, Tailwind CSS and daisyUI.

I''m keeping some of these smaller projects alongside the larger products. They show the individual things I''ve explored, without needing to turn each one into a long case study.') WHERE id='f84cfcc1-c504-4078-b5b5-68fc0c515712';
UPDATE public.projects SET slug=COALESCE(slug,'ellipsis-a-calm-place-for-busy-minds'),summary=COALESCE(summary,'A notes app for the thoughts that arrive before you have time to organise them.'),article=COALESCE(article,'## Thoughts don''t arrive in folders

Ellipsis started with a familiar problem: an idea, a deadline or something to remember turns up while you''re doing something else. Capturing it should take less effort than deciding where to put it.

The app is a place for those fragments. Add a thought while it is still half formed. Ellipsis connects it to the other things you''ve saved and helps bring it back when it becomes useful.

## Capture first, organise later

In my public updates, I''ve described these little entries as “pings”: groceries, an appointment, a random idea. They don''t need to become a carefully formatted document before they''re worth keeping.

That approach also extends to reminders. You can type or say a deadline rather than set up a planner around it. The product is built around getting a thought down and returning to it later.

## What it''s built with

Ellipsis uses Next.js, PostgreSQL on Neon, Better Auth and pgvector. The interface, account system and stored notes are parts of the same product, rather than an isolated frontend demo.

The live app is linked below. For a feel for what I''ve been building, my Substack and Twitter also have short updates about the product.') WHERE id='aa633556-f81a-42a5-b283-34ec5b9b33bb';
INSERT INTO public.personal_content(category,title,description,link,link_label,published,sort_order) SELECT 'writing','I write, too.','Essays, observations, and occasional updates on what I’m making.','https://substack.com/@kimtsok','Find me on Substack',true,0 WHERE NOT EXISTS(SELECT 1 FROM public.personal_content WHERE category='writing');
INSERT INTO public.personal_content(category,title,description,link,link_label,published,sort_order) SELECT 'games','Playing. And making.','I enjoy games, and I’ve made a few of my own. Over the Gear and Gladys are two of them.','/projects/over-the-gear','Meet Cog',true,1 WHERE NOT EXISTS(SELECT 1 FROM public.personal_content WHERE category='games');
INSERT INTO public.personal_content(category,title,description,link,link_label,published,sort_order) SELECT 'music','Something in FL Studio','Making music is another way I like to spend time. Sometimes I swap the code editor for a piano roll.',NULL,NULL,true,2 WHERE NOT EXISTS(SELECT 1 FROM public.personal_content WHERE category='music');
INSERT INTO public.personal_content(category,title,description,link,link_label,published,sort_order) SELECT '3d','A little 3D curiosity','I’ve dabbled in Blender. Still very much in the trying-things-out stage.',NULL,NULL,true,3 WHERE NOT EXISTS(SELECT 1 FROM public.personal_content WHERE category='3d');
INSERT INTO public.personal_content(category,title,description,link,link_label,published,sort_order) SELECT 'photography','Through my lens','Photography is another way I like to explore. A place for the things I stop to look at.','/photography','View photography',true,4 WHERE NOT EXISTS(SELECT 1 FROM public.personal_content WHERE category='photography');
COMMIT;
