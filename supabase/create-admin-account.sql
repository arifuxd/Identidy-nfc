-- Manual admin account bootstrap for Supabase.
-- Replace the placeholder values before running this in the Supabase SQL editor.
-- This creates an admin-only account with email/password sign-in and no public profile.

do $$
declare
  new_user_id uuid := gen_random_uuid();
  admin_email text := 'admin@example.com';
  admin_password text := 'ChangeThisPassword123!';
  admin_display_name text := 'Primary Admin';
begin
  insert into auth.users (
    id,
    instance_id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  )
  values (
    new_user_id,
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    admin_email,
    crypt(admin_password, gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    jsonb_build_object(
      'display_name', admin_display_name,
      'account_type', 'admin'
    ),
    now(),
    now(),
    '',
    '',
    '',
    ''
  );

  insert into auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    provider_id,
    last_sign_in_at,
    created_at,
    updated_at
  )
  values (
    gen_random_uuid(),
    new_user_id,
    jsonb_build_object(
      'sub', new_user_id::text,
      'email', admin_email
    ),
    'email',
    new_user_id::text,
    now(),
    now(),
    now()
  );

  insert into public.user_roles (user_id, role)
  values (new_user_id, 'admin')
  on conflict (user_id) do update
  set role = excluded.role;
end $$;
