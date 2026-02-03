# Thread & Grain — Clothes Shopping Website

A clothes shopping site built with **Next.js** (App Router) and **JSX**, styled with **Tailwind CSS**. Prices in **INR (₹)**. Sign in powered by **Supabase**.

## Features

- **Home** — Hero section and featured products
- **Shop** — Full product grid (prices in ₹ INR)
- **Product detail** — Size/quantity, Add to cart
- **Cart** — View items, quantity, total in ₹
- **Sign in** — Email/password auth via Supabase

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Supabase (Sign in)

Sign in uses **Supabase Auth**. Configure your project:

1. Copy env example:  
   `cp .env.local.example .env.local`
2. In [Supabase Dashboard](https://supabase.com/dashboard) → your project → **Settings** → **API**, copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Put them in `.env.local` (see `.env.local.example`).

Without these, the app runs but the sign-in page will show “Supabase not configured”.

## Project structure

- `src/app/` — Pages (home, products, cart, sign-in)
- `src/components/` — Nav, Footer, ProductCard
- `src/context/` — CartContext, AuthContext
- `src/data/` — Products (prices in INR)
- `src/lib/` — formatPrice (₹), Supabase client

## Tech stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- Supabase (auth)
- JSX
