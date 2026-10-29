# Portfolio content and photography

`/admin` is the content studio. It manages projects (including long Markdown stories), blog posts, Beyond code entries, photography, skills, services, and résumé/Cal.com/gallery settings. Entries support editing and display order. Published entries appear on the site. Archive removes an entry from public lists without deleting it; use Show archive to restore it. Project and article slugs stay stable after creation.

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
node --import tsx --test tests/content-validation.test.ts
node scripts/database.mjs file tests/content-rls.sql
npm run lint
npx tsc --noEmit
```

The RLS checks run in a transaction and roll back their draft test rows. No user accounts or real photos are created by these checks.

## Introduction card

Apply `scripts/005_introduction_card.sql` after migration 003. The Settings tab controls the introduction card’s portrait URL, image description, and short biography (140 characters maximum). The initial portrait is the public GitHub profile image saved locally, so the first screen does not depend on an external avatar service.

The opening loader waits for the card portrait and fonts, then releases the cards to drop into the stack and fan open. Asset failures have a 4.5-second fallback; an unavailable portrait uses initials. Reduced-motion visitors and direct section links skip the entrance choreography. JavaScript-disabled visitors can still read the introduction and use section links.
