-- Choose which existing project link appears beside Read story on project cards.
ALTER TABLE public.projects
ADD COLUMN IF NOT EXISTS card_link TEXT NOT NULL DEFAULT 'auto';
