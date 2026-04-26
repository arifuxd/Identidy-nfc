-- Legacy helper for promoting an existing account to admin.
-- New projects can use supabase/create-admin-account.sql to bootstrap a first admin directly.
-- Replace the email below with a real account, then run this in Supabase SQL editor.

update public.user_roles
set role = 'admin'
where user_id = (
  select id
  from auth.users
  where email = 'admin@example.com'
);
