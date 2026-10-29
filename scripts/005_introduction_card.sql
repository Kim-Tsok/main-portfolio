BEGIN;
ALTER TABLE public.site_settings
 ADD COLUMN IF NOT EXISTS intro_description text NOT NULL DEFAULT 'I’m based in Nigeria, building web products, client websites, and games.',
 ADD COLUMN IF NOT EXISTS intro_photo_url text NOT NULL DEFAULT '/kim-tsok-profile.jpg',
 ADD COLUMN IF NOT EXISTS intro_photo_alt text NOT NULL DEFAULT 'Kim Tsok’s profile picture';
COMMIT;
NOTIFY pgrst,'reload schema';
