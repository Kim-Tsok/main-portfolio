BEGIN;
-- Preserve verified existing owner access without trusting mutable user metadata.
CREATE TABLE IF NOT EXISTS public.portfolio_admins (user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE);
ALTER TABLE public.portfolio_admins ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.portfolio_admins FROM anon, authenticated;
INSERT INTO public.portfolio_admins(user_id)
SELECT id FROM auth.users WHERE raw_app_meta_data->>'is_admin'='true'
 OR (email='tsokkim556@gmail.com' AND email_confirmed_at IS NOT NULL AND raw_user_meta_data->>'is_admin'='true')
ON CONFLICT DO NOTHING;
CREATE OR REPLACE FUNCTION public.is_admin() RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = pg_catalog AS $$
 SELECT EXISTS(SELECT 1 FROM public.portfolio_admins WHERE user_id=auth.uid())
 OR COALESCE(auth.jwt()->'app_metadata'->>'is_admin'='true',false)
$$;
REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon,authenticated,service_role;

ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS summary text;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS article text;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS slug text;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS published boolean NOT NULL DEFAULT true;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS featured boolean NOT NULL DEFAULT false;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 100;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS archived_at timestamptz;
CREATE UNIQUE INDEX IF NOT EXISTS projects_slug_unique ON public.projects(slug) WHERE slug IS NOT NULL;
ALTER TABLE public.skills ADD COLUMN IF NOT EXISTS archived_at timestamptz;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS archived_at timestamptz;

CREATE TABLE IF NOT EXISTS public.blog_posts (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), slug text UNIQUE NOT NULL,
 title text NOT NULL, excerpt text NOT NULL DEFAULT '', category text NOT NULL DEFAULT 'Notes',
 body text NOT NULL DEFAULT '', published boolean NOT NULL DEFAULT false,
 published_at date NOT NULL DEFAULT current_date, sort_order integer NOT NULL DEFAULT 0,
 archived_at timestamptz, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS public.photographs (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),title text NOT NULL, alt_text text NOT NULL,
 caption text NOT NULL DEFAULT '', location text NOT NULL DEFAULT '', taken_at date,
 image_url text NOT NULL, storage_path text, published boolean NOT NULL DEFAULT false,
 sort_order integer NOT NULL DEFAULT 0, archived_at timestamptz,
 created_at timestamptz NOT NULL DEFAULT now(),updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS public.personal_content (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),title text NOT NULL,description text NOT NULL,
 category text NOT NULL DEFAULT 'other' CHECK(category IN ('writing','games','music','3d','photography','other')),
 link text, link_label text, published boolean NOT NULL DEFAULT false,sort_order integer NOT NULL DEFAULT 0,
 archived_at timestamptz,created_at timestamptz NOT NULL DEFAULT now(),updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS public.site_settings (
 id text PRIMARY KEY DEFAULT 'main' CHECK(id='main'), resume_url text NOT NULL DEFAULT '/resume',booking_url text,
 photography_intro text NOT NULL DEFAULT 'A few things I stopped to look at. Photographs from my side of the world.',
 updated_at timestamptz NOT NULL DEFAULT now()
);
INSERT INTO public.site_settings(id) VALUES('main') ON CONFLICT DO NOTHING;

CREATE OR REPLACE FUNCTION public.portfolio_updated_at() RETURNS trigger LANGUAGE plpgsql SET search_path=pg_catalog AS $$
BEGIN NEW.updated_at=now(); RETURN NEW; END; $$;
DO $$ DECLARE t text; p record; BEGIN
 FOREACH t IN ARRAY ARRAY['projects','skills','services','blog_posts','photographs','personal_content','site_settings'] LOOP
  EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY',t);
  -- Replace the old public-read policies so drafts and archives stay private.
  FOR p IN SELECT policyname FROM pg_policies WHERE schemaname='public' AND tablename=t LOOP
   EXECUTE format('DROP POLICY %I ON public.%I',p.policyname,t);
  END LOOP;
  EXECUTE format('GRANT SELECT,INSERT,UPDATE,DELETE ON public.%I TO authenticated',t);
  EXECUTE format('GRANT SELECT ON public.%I TO anon',t);
  EXECUTE format('CREATE POLICY admin_all ON public.%I FOR ALL TO authenticated USING(public.is_admin()) WITH CHECK(public.is_admin())',t);
  IF t IN ('projects','blog_posts','photographs','personal_content') THEN
   EXECUTE format('CREATE POLICY published_read ON public.%I FOR SELECT TO anon,authenticated USING(published AND archived_at IS NULL)',t);
  ELSIF t IN ('skills','services') THEN
   EXECUTE format('CREATE POLICY public_read ON public.%I FOR SELECT TO anon,authenticated USING(archived_at IS NULL)',t);
  ELSE
   EXECUTE format('CREATE POLICY public_read ON public.%I FOR SELECT TO anon,authenticated USING(true)',t);
  END IF;
  EXECUTE format('DROP TRIGGER IF EXISTS portfolio_updated_at ON public.%I',t);
  EXECUTE format('CREATE TRIGGER portfolio_updated_at BEFORE UPDATE ON public.%I FOR EACH ROW EXECUTE FUNCTION public.portfolio_updated_at()',t);
 END LOOP;
END $$;
-- Draft photos use signed URLs; publishing does not expose the storage bucket.
INSERT INTO storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
VALUES('portfolio-photos','portfolio-photos',false,6291456,ARRAY['image/jpeg','image/png','image/webp'])
ON CONFLICT(id) DO UPDATE SET public=false,file_size_limit=6291456,allowed_mime_types=ARRAY['image/jpeg','image/png','image/webp'];
DROP POLICY IF EXISTS portfolio_photo_admin ON storage.objects;
CREATE POLICY portfolio_photo_admin ON storage.objects FOR ALL TO authenticated USING(bucket_id='portfolio-photos' AND public.is_admin()) WITH CHECK(bucket_id='portfolio-photos' AND public.is_admin());
CREATE INDEX IF NOT EXISTS photographs_public_order ON public.photographs(sort_order,created_at) WHERE published AND archived_at IS NULL;
CREATE INDEX IF NOT EXISTS blog_public_date ON public.blog_posts(published_at DESC) WHERE published AND archived_at IS NULL;
COMMIT;
NOTIFY pgrst,'reload schema';
