-- Keep admin accounts out of the public profile system.

update auth.users
set raw_user_meta_data = coalesce(raw_user_meta_data, '{}'::jsonb) || jsonb_build_object(
  'account_type',
  coalesce(
    (
      select case when role = 'admin' then 'admin' else 'user' end
      from public.user_roles
      where user_id = auth.users.id
    ),
    'user'
  )
)
where coalesce(raw_user_meta_data ->> 'account_type', '') = '';

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  base_username text;
  resolved_slug text;
  requested_account_type text;
begin
  requested_account_type := case
    when coalesce(
      new.raw_user_meta_data ->> 'account_type',
      new.raw_app_meta_data ->> 'account_type',
      'user'
    ) = 'admin' then 'admin'
    else 'user'
  end;

  insert into public.user_roles (user_id, role)
  values (new.id, requested_account_type)
  on conflict (user_id) do update
  set role = excluded.role;

  if requested_account_type = 'admin' then
    return new;
  end if;

  base_username := split_part(coalesce(new.email, 'user'), '@', 1);
  base_username := regexp_replace(lower(base_username), '[^a-z0-9]+', '-', 'g');
  base_username := regexp_replace(base_username, '(^-+|-+$)', '', 'g');
  base_username := nullif(base_username, '');

  if base_username is null then
    base_username := 'user';
  end if;

  resolved_slug := public.generate_unique_slug(base_username, new.id);

  insert into public.profiles (
    id,
    username,
    slug,
    display_name,
    email_public
  )
  values (
    new.id,
    resolved_slug,
    resolved_slug,
    coalesce(new.raw_user_meta_data ->> 'display_name', initcap(replace(resolved_slug, '-', ' '))),
    new.email
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

delete from public.profile_views
where profile_id in (
  select user_id
  from public.user_roles
  where role = 'admin'
);

delete from public.social_links
where profile_id in (
  select user_id
  from public.user_roles
  where role = 'admin'
);

delete from public.experiences
where profile_id in (
  select user_id
  from public.user_roles
  where role = 'admin'
);

delete from public.profiles
where id in (
  select user_id
  from public.user_roles
  where role = 'admin'
);
