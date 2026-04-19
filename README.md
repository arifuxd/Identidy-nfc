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
- Mobile-first public profile pages at `/profile/[slug]`
- Save Contact `.vcf` download
- User dashboard for profile editing
- Debounced slug availability checking
- Profile visit analytics
- Admin dashboard for user management
- Supabase RLS and storage policies

## Local setup

1. Copy `.env.example` to `.env.local`
2. Fill in Supabase credentials
3. Run the SQL in [supabase/migrations/20260418234500_initial_schema.sql](/Volumes/Works/Web Development Projects/Identidy/supabase/migrations/20260418234500_initial_schema.sql)
4. Install dependencies:

```bash
npm install
```

5. Start development:

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
- `/login`, `/signup`
- `/profile/[slug]` public profile
- `/dashboard`
- `/dashboard/profile`
- `/dashboard/analytics`
- `/dashboard/settings`
- `/admin`
- `/admin/users`

## Supabase notes

- New `auth.users` rows automatically create a profile and default `user` role
- Media uploads use public buckets: `avatars` and `covers`
- Public profile view tracking is stored in `profile_views` with hourly de-duplication
- Admin actions rely on the service role key and must remain server-only
