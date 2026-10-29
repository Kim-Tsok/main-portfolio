BEGIN;
INSERT INTO public.blog_posts(id,slug,title,excerpt,body,published) VALUES('11111111-1111-4111-8111-111111111111','rls-test-draft','Private test','Test','Test',false);
INSERT INTO public.photographs(id,title,alt_text,image_url,published) VALUES('22222222-2222-4222-8222-222222222222','Private photo test','Test','https://res.cloudinary.com/test.webp',false);
INSERT INTO public.business_sectors(id,title,description,published) VALUES('33333333-3333-4333-8333-333333333333','Private business test','Test',false);
SET LOCAL ROLE anon;
DO $$ BEGIN
 IF EXISTS(SELECT 1 FROM public.blog_posts WHERE id='11111111-1111-4111-8111-111111111111') THEN RAISE EXCEPTION 'Anonymous reader can see a draft'; END IF;
 IF EXISTS(SELECT 1 FROM public.photographs WHERE id='22222222-2222-4222-8222-222222222222') THEN RAISE EXCEPTION 'Anonymous reader can see a private photo'; END IF;
 IF public.is_admin() THEN RAISE EXCEPTION 'Anonymous reader is admin'; END IF;
 IF EXISTS(SELECT 1 FROM public.business_sectors WHERE id='33333333-3333-4333-8333-333333333333') THEN RAISE EXCEPTION 'Anonymous reader can see draft business'; END IF;
 BEGIN INSERT INTO public.blog_posts(slug,title) VALUES('anonymous-write','Denied'); RAISE EXCEPTION 'Anonymous write was allowed'; EXCEPTION WHEN insufficient_privilege THEN NULL; END;
END $$;
RESET ROLE;
SELECT set_config('request.jwt.claims','{"role":"authenticated","sub":"aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa","user_metadata":{"is_admin":true}}',true) IS NOT NULL;
SET LOCAL ROLE authenticated;
DO $$ BEGIN
 IF public.is_admin() THEN RAISE EXCEPTION 'User metadata escalates privileges'; END IF;
 IF EXISTS(SELECT 1 FROM public.blog_posts WHERE id='11111111-1111-4111-8111-111111111111') THEN RAISE EXCEPTION 'Ordinary user can read draft'; END IF;
 BEGIN INSERT INTO public.photographs(title,alt_text,image_url) VALUES('Denied','Denied','https://res.cloudinary.com/test.webp'); RAISE EXCEPTION 'Ordinary user write allowed'; EXCEPTION WHEN insufficient_privilege THEN NULL; END;
 BEGIN INSERT INTO public.business_sectors(title,description) VALUES('Denied','Denied'); RAISE EXCEPTION 'Ordinary user business write allowed'; EXCEPTION WHEN insufficient_privilege THEN NULL; END;
 BEGIN INSERT INTO storage.objects(bucket_id,name) VALUES('portfolio-media','projects/rls-test.webp'); RAISE EXCEPTION 'Ordinary user media upload allowed'; EXCEPTION WHEN insufficient_privilege THEN NULL; END;
END $$;
RESET ROLE;
SELECT set_config('request.jwt.claims',jsonb_build_object('role','authenticated','sub',(SELECT user_id FROM public.portfolio_admins LIMIT 1))::text,true) IS NOT NULL;
SET LOCAL ROLE authenticated;
DO $$ BEGIN
 IF NOT public.is_admin() THEN RAISE EXCEPTION 'Existing owner lost admin access'; END IF;
 IF NOT EXISTS(SELECT 1 FROM public.blog_posts WHERE id='11111111-1111-4111-8111-111111111111') THEN RAISE EXCEPTION 'Owner cannot read drafts'; END IF;
 UPDATE public.blog_posts SET title='Owner can edit' WHERE id='11111111-1111-4111-8111-111111111111';
 UPDATE public.business_sectors SET title='Owner can edit business' WHERE id='33333333-3333-4333-8333-333333333333';
 IF NOT FOUND THEN RAISE EXCEPTION 'Owner cannot edit business sectors'; END IF;
 INSERT INTO storage.objects(bucket_id,name) VALUES('portfolio-media','projects/rls-test.webp');
END $$;
RESET ROLE;
DO $$ BEGIN IF (SELECT public FROM storage.buckets WHERE id='portfolio-photos') THEN RAISE EXCEPTION 'Photo bucket is public'; END IF; END $$;
ROLLBACK;
SELECT 'PASS: drafts, unauthorized content/media writes, forged metadata, owner access, private photography. All test rows rolled back.';
