-- Create profile_redirects table
create table if not exists public.profile_redirects (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  slug citext not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profile_redirects_slug_format check (slug::text ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

-- Enable RLS
alter table public.profile_redirects enable row level security;

-- Policies
create policy "Allow public read access to profile redirects"
  on public.profile_redirects for select
  using (true);

create policy "Allow admins full access to profile redirects"
  on public.profile_redirects for all
  using (
    exists (
      select 1 from public.user_roles
      where user_roles.user_id = auth.uid()
      and user_roles.role = 'admin'
    )
  );

-- Trigger for updated_at
create trigger set_profile_redirects_updated_at
  before update on public.profile_redirects
  for each row
  execute function public.set_updated_at();

-- Re-define slug_available to check profile_redirects too
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
  ) and not exists (
    select 1
    from public.profile_redirects
    where slug = lower(desired_slug)::citext
  );
$$;

-- Create redirect_slug_available function
create or replace function public.redirect_slug_available(
  desired_slug text,
  current_redirect_id uuid default null
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
  ) and not exists (
    select 1
    from public.profile_redirects
    where slug = lower(desired_slug)::citext
      and (current_redirect_id is null or id <> current_redirect_id)
  );
$$;
