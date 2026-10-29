BEGIN;

ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS category text;
UPDATE public.projects SET category = CASE
 WHEN EXISTS (SELECT 1 FROM unnest(tech_stack) AS tag WHERE lower(tag)='client') THEN 'Client work'
 WHEN slug IN ('genie') THEN 'Developer tool'
 WHEN slug IN ('gladys','over-the-gear') THEN 'Game'
 WHEN slug IN ('mist','omlit') THEN 'Experiment'
 ELSE 'Personal product' END WHERE category IS NULL;
ALTER TABLE public.projects ALTER COLUMN category SET DEFAULT 'Personal product';
ALTER TABLE public.projects ALTER COLUMN category SET NOT NULL;
ALTER TABLE public.projects ADD CONSTRAINT projects_category_check
 CHECK(category IN ('Client work','Personal product','Developer tool','Game','Experiment'));

CREATE TABLE public.business_sectors (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), title text NOT NULL UNIQUE,
 description text NOT NULL, link text, status text NOT NULL DEFAULT 'Planned'
 CHECK(status IN ('Planned','Available')), published boolean NOT NULL DEFAULT false,
 sort_order integer NOT NULL DEFAULT 0, archived_at timestamptz,
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(),
 CONSTRAINT available_sector_link CHECK(status <> 'Available' OR nullif(trim(link),'') IS NOT NULL)
);
ALTER TABLE public.business_sectors ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.business_sectors TO anon;
GRANT SELECT,INSERT,UPDATE,DELETE ON public.business_sectors TO authenticated;
CREATE POLICY admin_all ON public.business_sectors FOR ALL TO authenticated
 USING(public.is_admin()) WITH CHECK(public.is_admin());
CREATE POLICY published_read ON public.business_sectors FOR SELECT TO anon,authenticated
 USING(published AND archived_at IS NULL);
CREATE TRIGGER portfolio_updated_at BEFORE UPDATE ON public.business_sectors
 FOR EACH ROW EXECUTE FUNCTION public.portfolio_updated_at();
INSERT INTO public.business_sectors(title,description,link,status,published,sort_order) VALUES
 ('Law firms','Clear practice areas, lawyer profiles and a direct way for prospective clients to enquire.','/lawyers','Available',true,0),
 ('Cleaning & maintenance','Service details, quote requests and a simpler path from an enquiry to a scheduled job.',null,'Planned',true,1),
 ('Creative agencies','Development support for approved designs, responsive websites and CMS integrations.',null,'Planned',true,2),
 ('Event venues','Space to show the venue, answer booking questions and collect the details needed for a quote.',null,'Planned',true,3),
 ('Property businesses','Property information, viewing requests and enquiries that are easier to follow up.',null,'Planned',true,4),
 ('Accounting firms','A clear explanation of your services and an easy way for the right clients to get in touch.',null,'Planned',true,5);

-- Public portfolio media is separate from the private photography library.
-- Only administrators can write or list objects in this bucket.
INSERT INTO storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
 VALUES('portfolio-media','portfolio-media',true,6291456,ARRAY['image/webp'])
 ON CONFLICT(id) DO UPDATE SET public=true,file_size_limit=6291456,allowed_mime_types=ARRAY['image/webp'];
CREATE POLICY portfolio_media_admin ON storage.objects FOR ALL TO authenticated
 USING(bucket_id='portfolio-media' AND public.is_admin())
 WITH CHECK(bucket_id='portfolio-media' AND public.is_admin());
COMMIT;
NOTIFY pgrst,'reload schema';
