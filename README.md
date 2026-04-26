# Identidy

Production-ready SaaS-style NFC business card platform built with Next.js App Router and Supabase.

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS v4
- Supabase Auth, Postgres, Storage
- React Hook Form + Zod
- Recharts

## Features

- Marketing landing page
- Mobile-first public profile pages at `/{username}`
- Save Contact `.vcf` download
- User login at `/login`
- Admin login and workspace at `/admin`
- Admin-created user accounts only (no public signup)
- User dashboard for profile editing
- Debounced slug availability checking
- Profile visit analytics
- Admin dashboard for user management
- Supabase RLS and storage policies

## Local setup

1. Copy `.env.example` to `.env.local`
2. Fill in Supabase credentials
3. Run the SQL in [supabase/migrations/20260418234500_initial_schema.sql](/Volumes/Works/Web Development Projects/Identidy/supabase/migrations/20260418234500_initial_schema.sql)
4. Run the latest migration in [`supabase/migrations/20260426090000_split_admin_accounts_from_public_profiles.sql`](/E:/Identidy-nfc/supabase/migrations/20260426090000_split_admin_accounts_from_public_profiles.sql)
5. If you need to bootstrap the first admin manually, use [`supabase/create-admin-account.sql`](/E:/Identidy-nfc/supabase/create-admin-account.sql)
6. Install dependencies:

```bash
npm install
```

7. Start development:

```bash
npm run dev
```

## Environment variables

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Route map

- `/` marketing page
- `/login`
- `/admin`
- `/{username}` public profile
- `/dashboard`
- `/dashboard/profile`
- `/dashboard/analytics`
- `/dashboard/settings`
- `/admin/users`

## Supabase notes

- User accounts create a profile row automatically
- Admin accounts keep an admin role but do not get a public profile row
- Media uploads use public buckets: `avatars` and `covers`
- Public profile view tracking is stored in `profile_views` with hourly de-duplication
- Admin actions rely on the service role key and must remain server-only
