# Portfolio content and photography

`/admin` is the content studio. It manages projects (including long Markdown stories), blog posts, Beyond code entries, photography, business sectors, skills, services, and résumé/Cal.com/gallery settings. Entries support editing and display order. Published entries appear on the site. Archive removes an entry from public lists without deleting it; use Show archive to restore it. Project and article slugs are filled from the title for new entries and stay stable after creation.

## Database setup

Run the additive schema migration and initial content seed in order:

```
node scripts/database.mjs file scripts/003_content_management.sql
node scripts/database.mjs file scripts/004_seed_portfolio_content.sql
```

The helper reads database credentials from `.env.local` and passes passwords through the child environment, never command arguments. The seed is repeatable: existing posts and personal entries are preserved; project stories are filled only when missing.

The migration preserves the previously configured, confirmed portfolio owner's access in `portfolio_admins`. Authorization uses this protected table or server-managed `app_metadata.is_admin`, never mutable user metadata. The admin page and every write endpoint verify the user and the database role check. RLS enforces the same rule for direct API access. The service-role key is used only on the server to sign published photo URLs, never to bypass authorization on content writes.

## Photography

Upload your own JPEG, PNG or WebP file (up to 6 MB), add a title and meaningful alt text, and optionally set a caption, date and location. Uploading alone does not publish a photo. Check Published, then Save changes to share it.

Uploads are re-encoded to WebP, fitted within 2400×2400 without enlargement, and stripped of EXIF/GPS metadata. The original file is not retained. Keep your originals separately. Files live in the private `portfolio-photos` bucket. Admin previews and published images receive expiring signed URLs. No stock photography is inserted.

The homepage shows up to four published images in Beyond code. `/photography` shows the full collection. Clicking an image opens a keyboard-accessible viewer; arrow keys move through the collection and Escape closes it.

Use the Photography introduction field in Site settings to change the gallery copy. You can also provide a Cloudinary or configured Supabase image URL instead of uploading.

## Blog and personal content

The starter notes are seeded from `lib/posts.ts` once. Public routes now read `blog_posts`, not that source file. Changing, drafting or archiving a seeded post in admin controls the website. Beyond code reads `personal_content`; the existing hobbies have been migrated there. Project stories are seeded into `projects.article` and are editable in the same studio.

## Checks

```
node --import tsx tests/content-validation.test.ts
node --import tsx tests/article-images.test.ts
node scripts/database.mjs file tests/content-rls.sql
npm run lint
npx tsc --noEmit
```

The RLS checks run in a transaction and roll back their draft test rows. No user accounts or real photos are created by these checks.

## Introduction card

Apply `scripts/005_introduction_card.sql` after migration 003. The Settings tab controls the introduction card’s portrait URL, image description, and short biography (140 characters maximum). The initial portrait is the public GitHub profile image saved locally, so the first screen does not depend on an external avatar service.

The opening loader waits for the card portrait and fonts, then releases the cards to drop into the stack and fan open. Asset failures have a 4.5-second fallback; an unavailable portrait uses initials. Reduced-motion visitors and direct section links skip the entrance choreography. JavaScript-disabled visitors can still read the introduction and use section links.

## Project types, images and business pages

Apply `scripts/006_business_and_media.sql` once after migrations 003–005. It backfills project types, creates the editable business directory and adds a public media bucket. Existing project stories and links are preserved.

Choose Client work, Personal product, Developer tool, Game or Experiment in Projects. This controls the work filters; there is no need to put Client in the tools field. Upload a screenshot directly in Projects or a portrait in Site settings, then save the entry. Blog uploads append an image to the article with the description you provide. Move its Markdown line to the desired paragraph and use Preview before saving. Only supported portfolio image sources render as article images; arbitrary HTML remains escaped.

Project, portrait and blog images have permanent public URLs in `portfolio-media`. Uploading does not publish an entry, but the uploaded asset itself is publicly accessible. Photography stays in the separate private bucket. Both upload destinations require an administrator session and re-encode files without GPS/EXIF metadata.

For businesses controls `/business`. Add or edit a business type, description and display order. Keep Specialized page set to Planned until its destination exists; Available requires a link. The initial list includes the existing law-firm page and planned pages for cleaning, agencies, venues, property businesses and accounting firms. No new specialized sites are created by this migration.

The canonical site URL remains the current domain. Once `kimtsok.dev` is registered and connected in hosting, set `NEXT_PUBLIC_SITE_URL=https://kimtsok.dev` and redeploy to update canonical URLs, sitemap links and metadata.

## Unsaved edits

The studio marks unsaved changes and asks whether to keep editing or discard them before switching collections, selecting another entry, starting a new entry, archiving the edited entry, returning home or signing out. Escape keeps the draft and returns keyboard focus. Browser reloads and closing the page use the browser’s own unsaved-change warning. This is a warning, not automatic draft storage; save changes to persist them.

The introduction description has a 140-character limit and counter. Successful saves retain their entry ID even if the list refresh fails, so retrying updates the saved entry.
