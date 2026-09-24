# Kim Tsok, portfolio

Personal portfolio for Kim Tsok. Next.js 16, Tailwind CSS 4, Framer Motion, with projects, skills and services stored in Supabase and managed from `/admin`.

## Running locally

```bash
pnpm install
pnpm dev
```

Create `.env.local` with:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SITE_URL=
```

The database schema lives in `scripts/*.sql`. Run `pnpm create-admin` to create an admin user.

## Where things are

- `lib/site.ts`: name, email, social links, nav, and the optional CV file
- `lib/data.ts`: cached Supabase queries used by the home page
- `components/`: one file per section of the page
- `app/globals.css`: colour tokens and the graph-paper background

Project images are served from Cloudinary, which resizes them on the fly (see the loader in `components/work.tsx`). Tagging a project with `Client` in its tech stack puts it under the "Client work" filter.
