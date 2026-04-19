create extension if not exists "pgcrypto";
create extension if not exists "citext";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text not null unique,
  slug citext not null unique,
  display_name text not null,
  bio text,
  address text,
  job_title text,
  company_name text,
  phone_public text,
  email_public text,
  avatar_path text,
  cover_path text,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_slug_format check (slug::text ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create table if not exists public.social_links (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  platform text not null,
  label text,
  url text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  company text,
  location text,
  description text,
  start_date date,
  end_date date,
  is_current boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  constraint experiences_end_date_check check (
    not (is_current = true and end_date is not null)
  )
);

create table if not exists public.profile_views (
  id bigint generated always as identity primary key,
  profile_id uuid not null references public.profiles (id) on delete cascade,
  visitor_hash text not null,
  time_bucket timestamptz not null,
  referrer text,
  user_agent text,
  viewed_at timestamptz not null default now(),
  constraint profile_views_dedupe unique (profile_id, visitor_hash, time_bucket)
);

create table if not exists public.user_roles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'user',
  constraint user_roles_role_check check (role in ('user', 'admin'))
);

create index if not exists social_links_profile_id_idx
  on public.social_links (profile_id, sort_order);

create index if not exists experiences_profile_id_idx
  on public.experiences (profile_id, sort_order);

create index if not exists profile_views_profile_id_idx
  on public.profile_views (profile_id);

create index if not exists profile_views_profile_id_viewed_at_idx
  on public.profile_views (profile_id, viewed_at desc);

create index if not exists user_roles_role_idx
  on public.user_roles (role);

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = (select auth.uid())
      and role = 'admin'
  );
$$;

create or replace function public.slug_available(
  desired_slug text,
  current_profile_id uuid default null
)
returns boolean
language sql
security definer
set search_path = public
as $$
  select not exists (
    select 1
    from public.profiles
    where slug = lower(desired_slug)::citext
      and (current_profile_id is null or id <> current_profile_id)
  );
$$;

create or replace function public.profile_views_daily(
  target_profile_id uuid,
  from_date timestamptz
)
returns table (day date, views bigint)
language sql
security definer
set search_path = public
as $$
  select
    date(viewed_at) as day,
    count(*)::bigint as views
  from public.profile_views
  where profile_id = target_profile_id
    and viewed_at >= from_date
  group by 1
  order by 1 asc;
$$;

create or replace function public.generate_unique_slug(base_slug text, user_id uuid)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  candidate text;
  suffix integer := 0;
begin
  candidate := regexp_replace(lower(trim(base_slug)), '[^a-z0-9]+', '-', 'g');
  candidate := regexp_replace(candidate, '(^-+|-+$)', '', 'g');
  candidate := nullif(candidate, '');

  if candidate is null then
    candidate := 'user';
  end if;

  loop
    exit when not exists (
      select 1
      from public.profiles
      where slug = (
        case
          when suffix = 0 then candidate
          else candidate || '-' || suffix
        end
      )::citext
      and id <> user_id
    );

    suffix := suffix + 1;
  end loop;

  return case
    when suffix = 0 then candidate
    else candidate || '-' || suffix
  end;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  base_username text;
  resolved_slug text;
begin
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

  insert into public.user_roles (user_id, role)
  values (new.id, 'user')
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.social_links enable row level security;
alter table public.experiences enable row level security;
alter table public.profile_views enable row level security;
alter table public.user_roles enable row level security;

create policy "public can read published profiles"
  on public.profiles
  for select
  using (is_published = true);

create policy "users can read own profile"
  on public.profiles
  for select
  using ((select auth.uid()) = id);

create policy "users can update own profile"
  on public.profiles
  for update
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create policy "admins manage profiles"
  on public.profiles
  for all
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "public can read social links for published profiles"
  on public.social_links
  for select
  using (
    exists (
      select 1
      from public.profiles
      where profiles.id = social_links.profile_id
        and profiles.is_published = true
    )
  );

create policy "users manage own social links"
  on public.social_links
  for all
  using (
    exists (
      select 1
      from public.profiles
      where profiles.id = social_links.profile_id
        and profiles.id = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1
      from public.profiles
      where profiles.id = social_links.profile_id
        and profiles.id = (select auth.uid())
    )
  );

create policy "admins manage social links"
  on public.social_links
  for all
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "public can read experiences for published profiles"
  on public.experiences
  for select
  using (
    exists (
      select 1
      from public.profiles
      where profiles.id = experiences.profile_id
        and profiles.is_published = true
    )
  );

create policy "users manage own experiences"
  on public.experiences
  for all
  using (
    exists (
      select 1
      from public.profiles
      where profiles.id = experiences.profile_id
        and profiles.id = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1
      from public.profiles
      where profiles.id = experiences.profile_id
        and profiles.id = (select auth.uid())
    )
  );

create policy "admins manage experiences"
  on public.experiences
  for all
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "users can read own profile views"
  on public.profile_views
  for select
  using (
    exists (
      select 1
      from public.profiles
      where profiles.id = profile_views.profile_id
        and profiles.id = (select auth.uid())
    )
  );

create policy "service and admins manage profile views"
  on public.profile_views
  for all
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "users can read own role"
  on public.user_roles
  for select
  using ((select auth.uid()) = user_id);

create policy "admins manage roles"
  on public.user_roles
  for all
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('covers', 'covers', true)
on conflict (id) do nothing;

create policy "public can view media"
  on storage.objects
  for select
  using (bucket_id in ('avatars', 'covers'));

create policy "authenticated users upload own media"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id in ('avatars', 'covers')
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "authenticated users update own media"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id in ('avatars', 'covers')
    and (storage.foldername(name))[1] = (select auth.uid())::text
  )
  with check (
    bucket_id in ('avatars', 'covers')
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "authenticated users delete own media"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id in ('avatars', 'covers')
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );
