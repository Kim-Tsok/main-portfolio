BEGIN;
-- Keep edited descriptions and publishing settings for existing entries.
UPDATE public.business_sectors SET link='/business/cleaning',status='Available'
WHERE link IS NULL AND status='Planned' AND title='Cleaning & maintenance';
-- The unshipped venue draft was replaced by the selected lawn-care focus.
UPDATE public.business_sectors SET link=NULL,status='Planned'
WHERE link='/business/venues' AND title='Event venues';
INSERT INTO public.business_sectors(title,description,link,status,published,sort_order)
VALUES('Landscaping & lawn care','Show your completed work, explain where you operate and collect useful estimate requests.','/business/landscaping','Available',true,2)
ON CONFLICT(title) DO NOTHING;
COMMIT;
NOTIFY pgrst,'reload schema';
