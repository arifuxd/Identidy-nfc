alter table public.profiles
  drop constraint if exists profiles_profile_style_check;

alter table public.profiles
  add constraint profiles_profile_style_check
  check (profile_style in ('style-1', 'style-2', 'style-3', 'style-4', 'style-5', 'style-6'));
