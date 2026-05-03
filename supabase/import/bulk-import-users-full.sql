-- Full bulk import (account + profile + social links + experience)
-- 1) Edit JSON payload below.
-- 2) Run in Supabase SQL Editor.
--
-- Behavior:
-- - Creates auth account if email doesn't exist.
-- - Updates/creates user_roles.
-- - For role=user: upserts profile + replaces social_links + experiences.
-- - For role=admin: removes any public profile data.

do $$
declare
  rec record;
  account jsonb;
  profile jsonb;
  social_links jsonb;
  experiences jsonb;
  existing_user_id uuid;
  target_user_id uuid;
  normalized_role text;
  resolved_slug text;
  resolved_username text;
begin
  for rec in
    select *
    from jsonb_array_elements(
      $$[
        {
          "account": {"email":"jane@example.com","password":"StrongPass#123","display_name":"Jane Doe","role":"user"},
          "profile": {
            "username":"jane-doe",
            "slug":"jane-doe",
            "bio":"Founder building modern customer experiences.",
            "address":"San Francisco, CA",
            "job_title":"Founder & CEO",
            "company_name":"Nova Labs",
            "phone_home":"+1-415-555-0101",
            "phone_office":"+1-415-555-0110",
            "email_home":"jane@example.com",
            "email_office":"hello@novalabs.com",
            "avatar_path":"https://your-project.supabase.co/storage/v1/object/public/avatars/example/jane.webp",
            "cover_path":"https://your-project.supabase.co/storage/v1/object/public/covers/example/jane-cover.webp",
            "is_published":true,
            "profile_style":"style-1",
            "accent_color":"#3b82f6"
          },
          "social_links":[
            {"platform":"linkedin","label":"LinkedIn","url":"https://linkedin.com/in/janedoe","sort_order":0},
            {"platform":"portfolio","label":"Website","url":"https://janedoe.com","sort_order":1}
          ],
          "experiences":[
            {"title":"Founder & CEO","company":"Nova Labs","location":"San Francisco","description":"Leading product and growth.","start_date":"2021-01-01","end_date":null,"is_current":true,"sort_order":0}
          ]
        }
      ]$$::jsonb
    ) as x(item)
  loop
    account := rec.item -> 'account';
    profile := rec.item -> 'profile';
    social_links := coalesce(rec.item -> 'social_links', '[]'::jsonb);
    experiences := coalesce(rec.item -> 'experiences', '[]'::jsonb);

    if account is null then
      raise notice 'Skipped row: missing account object';
      continue;
    end if;

    if coalesce(account ->> 'email', '') = '' then
      raise notice 'Skipped row: missing account.email';
      continue;
    end if;

    normalized_role := case when lower(coalesce(account ->> 'role', 'user')) = 'admin' then 'admin' else 'user' end;

    select id into existing_user_id
    from auth.users
    where lower(email) = lower(account ->> 'email')
    limit 1;

    if existing_user_id is null then
      if coalesce(account ->> 'password', '') = '' or length(account ->> 'password') < 8 then
        raise notice 'Skipped %: password must be >= 8 chars for new accounts', account ->> 'email';
        continue;
      end if;

      target_user_id := gen_random_uuid();

      insert into auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
        confirmation_token, email_change, email_change_token_new, recovery_token
      )
      values (
        target_user_id,
        '00000000-0000-0000-0000-000000000000',
        'authenticated',
        'authenticated',
        lower(account ->> 'email'),
        crypt(account ->> 'password', gen_salt('bf')),
        now(),
        jsonb_build_object('provider','email','providers',jsonb_build_array('email')),
        jsonb_build_object(
          'display_name', coalesce(nullif(account ->> 'display_name', ''), split_part(lower(account ->> 'email'), '@', 1)),
          'account_type', normalized_role
        ),
        now(), now(), '', '', '', ''
      );

      insert into auth.identities (
        id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at
      )
      values (
        gen_random_uuid(),
        target_user_id,
        jsonb_build_object('sub', target_user_id::text, 'email', lower(account ->> 'email')),
        'email',
        target_user_id::text,
        now(), now(), now()
      );
    else
      target_user_id := existing_user_id;

      update auth.users
      set raw_user_meta_data = coalesce(raw_user_meta_data, '{}'::jsonb) || jsonb_build_object(
        'display_name', coalesce(nullif(account ->> 'display_name', ''), split_part(lower(account ->> 'email'), '@', 1)),
        'account_type', normalized_role
      ),
      updated_at = now()
      where id = target_user_id;
    end if;

    insert into public.user_roles (user_id, role)
    values (target_user_id, normalized_role)
    on conflict (user_id) do update set role = excluded.role;

    if normalized_role = 'admin' then
      delete from public.profile_views where profile_id = target_user_id;
      delete from public.social_links where profile_id = target_user_id;
      delete from public.experiences where profile_id = target_user_id;
      delete from public.profiles where id = target_user_id;
      raise notice 'Upserted admin account %', account ->> 'email';
      continue;
    end if;

    resolved_slug := coalesce(nullif(profile ->> 'slug', ''), split_part(lower(account ->> 'email'), '@', 1));
    resolved_slug := public.generate_unique_slug(resolved_slug, target_user_id);
    resolved_username := coalesce(nullif(profile ->> 'username', ''), resolved_slug);

    insert into public.profiles (
      id, username, slug, display_name, bio, address, job_title, company_name,
      phone_home, phone_office, phone_public, email_home, email_office, email_public,
      avatar_path, cover_path, is_published, profile_style, accent_color
    )
    values (
      target_user_id,
      resolved_username,
      resolved_slug,
      coalesce(nullif(account ->> 'display_name', ''), split_part(lower(account ->> 'email'), '@', 1)),
      nullif(profile ->> 'bio', ''),
      nullif(profile ->> 'address', ''),
      nullif(profile ->> 'job_title', ''),
      nullif(profile ->> 'company_name', ''),
      nullif(profile ->> 'phone_home', ''),
      nullif(profile ->> 'phone_office', ''),
      coalesce(nullif(profile ->> 'phone_home', ''), nullif(profile ->> 'phone_office', '')),
      nullif(profile ->> 'email_home', ''),
      nullif(profile ->> 'email_office', ''),
      coalesce(nullif(profile ->> 'email_home', ''), nullif(profile ->> 'email_office', ''), lower(account ->> 'email')),
      nullif(profile ->> 'avatar_path', ''),
      nullif(profile ->> 'cover_path', ''),
      coalesce((profile ->> 'is_published')::boolean, true),
      coalesce(nullif(profile ->> 'profile_style', ''), 'style-1'),
      coalesce(nullif(profile ->> 'accent_color', ''), '#3b82f6')
    )
    on conflict (id) do update
    set username = excluded.username,
        slug = excluded.slug,
        display_name = excluded.display_name,
        bio = excluded.bio,
        address = excluded.address,
        job_title = excluded.job_title,
        company_name = excluded.company_name,
        phone_home = excluded.phone_home,
        phone_office = excluded.phone_office,
        phone_public = excluded.phone_public,
        email_home = excluded.email_home,
        email_office = excluded.email_office,
        email_public = excluded.email_public,
        avatar_path = excluded.avatar_path,
        cover_path = excluded.cover_path,
        is_published = excluded.is_published,
        profile_style = excluded.profile_style,
        accent_color = excluded.accent_color,
        updated_at = now();

    delete from public.social_links where profile_id = target_user_id;
    insert into public.social_links (profile_id, platform, label, url, sort_order)
    select
      target_user_id,
      item ->> 'platform',
      nullif(item ->> 'label', ''),
      item ->> 'url',
      coalesce((item ->> 'sort_order')::int, 0)
    from jsonb_array_elements(social_links) as s(item)
    where coalesce(item ->> 'platform', '') <> ''
      and coalesce(item ->> 'url', '') <> '';

    delete from public.experiences where profile_id = target_user_id;
    insert into public.experiences (
      profile_id, title, company, location, description, start_date, end_date, is_current, sort_order
    )
    select
      target_user_id,
      item ->> 'title',
      nullif(item ->> 'company', ''),
      nullif(item ->> 'location', ''),
      nullif(item ->> 'description', ''),
      nullif(item ->> 'start_date', '')::date,
      nullif(item ->> 'end_date', '')::date,
      coalesce((item ->> 'is_current')::boolean, false),
      coalesce((item ->> 'sort_order')::int, 0)
    from jsonb_array_elements(experiences) as e(item)
    where coalesce(item ->> 'title', '') <> '';

    raise notice 'Upserted user profile %', account ->> 'email';
  end loop;
end $$;