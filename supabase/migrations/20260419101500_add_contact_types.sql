alter table public.profiles
  add column if not exists phone_home text,
  add column if not exists phone_office text,
  add column if not exists email_home text,
  add column if not exists email_office text,
  add column if not exists accent_color text not null default '#3b82f6',
  add column if not exists avatar_shape text not null default 'circle',
  add column if not exists profile_alignment text not null default 'center';

update public.profiles
set
  phone_home = coalesce(phone_home, phone_public),
  email_home = coalesce(email_home, email_public)
where true;

alter table public.profiles
  add column if not exists phone_public_type text not null default 'home';

alter table public.profiles
  add column if not exists email_public_type text not null default 'home';

alter table public.profiles
  drop constraint if exists profiles_phone_public_type_check;

alter table public.profiles
  add constraint profiles_phone_public_type_check
  check (phone_public_type in ('home', 'office'));

alter table public.profiles
  drop constraint if exists profiles_email_public_type_check;

alter table public.profiles
  add constraint profiles_email_public_type_check
  check (email_public_type in ('home', 'office'));

alter table public.profiles
  drop constraint if exists profiles_avatar_shape_check;

alter table public.profiles
  add constraint profiles_avatar_shape_check
  check (avatar_shape in ('circle', 'rounded'));

alter table public.profiles
  drop constraint if exists profiles_profile_alignment_check;

alter table public.profiles
  add constraint profiles_profile_alignment_check
  check (profile_alignment in ('center', 'left'));
