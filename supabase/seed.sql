-- Promote a specific user to admin after signup.
-- Replace the email below with a real account, then run this in Supabase SQL editor.

update public.user_roles
set role = 'admin'
where user_id = (
  select id
  from auth.users
  where email = 'admin@example.com'
);
