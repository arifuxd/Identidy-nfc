-- Bulk import users for Identidy (Supabase)
-- Paste this into Supabase SQL Editor and run once.
-- Edit the JSON payload below with your real users.
--
-- Notes:
-- 1) This creates auth.users + auth.identities directly.
-- 2) Trigger public.handle_new_user() auto-creates user_roles and profiles.
-- 3) role can be "user" or "admin".
-- 4) Duplicate emails are skipped safely.

do $$
declare
  rec record;
  new_user_id uuid;
  normalized_role text;
begin
  for rec in
    select *
    from jsonb_to_recordset(
      $$[
        {"email":"jane@example.com","password":"StrongPass#123","display_name":"Jane Doe","role":"user"},
        {"email":"john@example.com","password":"StrongPass#123","display_name":"John Smith","role":"user"},
        {"email":"ops-admin@example.com","password":"StrongPass#123","display_name":"Ops Admin","role":"admin"}
      ]$$::jsonb
    ) as x(email text, password text, display_name text, role text)
  loop
    -- Basic validation / normalization
    if rec.email is null or btrim(rec.email) = '' then
      raise notice 'Skipped row: missing email';
      continue;
    end if;

    if rec.password is null or length(rec.password) < 8 then
      raise notice 'Skipped %: password must be at least 8 chars', rec.email;
      continue;
    end if;

    normalized_role := case when lower(coalesce(rec.role, 'user')) = 'admin' then 'admin' else 'user' end;

    -- Skip existing email
    if exists (select 1 from auth.users where lower(email) = lower(rec.email)) then
      raise notice 'Skipped %: email already exists', rec.email;
      continue;
    end if;

    new_user_id := gen_random_uuid();

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
      lower(btrim(rec.email)),
      crypt(rec.password, gen_salt('bf')),
      now(),
      jsonb_build_object('provider', 'email', 'providers', jsonb_build_array('email')),
      jsonb_build_object(
        'display_name', coalesce(nullif(btrim(rec.display_name), ''), split_part(lower(btrim(rec.email)), '@', 1)),
        'account_type', normalized_role
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
        'email', lower(btrim(rec.email))
      ),
      'email',
      new_user_id::text,
      now(),
      now(),
      now()
    );

    raise notice 'Created % (% role)', rec.email, normalized_role;
  end loop;
end $$;