create table if not exists public.profile_connections (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  visitor_name text not null,
  visitor_phone text not null,
  visitor_email text,
  created_at timestamptz not null default now()
);

create index if not exists profile_connections_profile_id_created_at_idx
  on public.profile_connections (profile_id, created_at desc);

alter table public.profile_connections enable row level security;

create policy "users can read own profile connections"
  on public.profile_connections
  for select
  using (
    exists (
      select 1
      from public.profiles
      where profiles.id = profile_connections.profile_id
        and profiles.id = (select auth.uid())
    )
  );

create policy "admins manage profile connections"
  on public.profile_connections
  for all
  using ((select public.is_admin()))
  with check ((select public.is_admin()));
