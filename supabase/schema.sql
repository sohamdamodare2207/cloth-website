-- Thread & Grain — Supabase SQL schema
-- Run in Supabase Dashboard → SQL Editor (or via migrations)

-- =============================================================================
-- 1. PROFILES (extends Supabase Auth users)
-- =============================================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create profile when a new user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', '')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- RLS: users can read/update their own profile
alter table public.profiles enable row level security;

drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- =============================================================================
-- 2. ORDERS
-- =============================================================================
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  total_amount bigint not null check (total_amount >= 0),
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Index for listing orders by user
create index if not exists orders_user_id_idx on public.orders(user_id);

alter table public.orders enable row level security;

drop policy if exists "Users can view own orders" on public.orders;
create policy "Users can view own orders"
  on public.orders for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own orders" on public.orders;
create policy "Users can insert own orders"
  on public.orders for insert
  with check (auth.uid() = user_id);

-- =============================================================================
-- 3. ORDER ITEMS (line items per order)
-- =============================================================================
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text not null,
  product_name text not null,
  size text not null,
  quantity int not null check (quantity > 0),
  unit_price bigint not null check (unit_price >= 0),
  image_url text,
  created_at timestamptz default now()
);

create index if not exists order_items_order_id_idx on public.order_items(order_id);

drop policy if exists "Users can view own order items" on public.order_items;
create policy "Users can view own order items"
  on public.order_items for select
  using (
    exists (
      select 1 from public.orders o
      where o.id = order_items.order_id and o.user_id = auth.uid()
    )
  );

drop policy if exists "Users can insert order items for own orders" on public.order_items;    )
  );

create policy "Users can insert order items for own orders"
  on public.order_items for insert
  with check (
    exists (
      select 1 from public.orders o
      where o.id = order_items.order_id and o.user_id = auth.uid()
    )
  );

-- =============================================================================
-- 4. OPTIONAL: CART ITEMS (persist cart in DB for logged-in users)
-- =============================================================================
create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id text not null,
  product_name text not null,
  size text not null,
  quantity int not null check (quantity > 0),
  unit_price bigint not null check (unit_price >= 0),
  image_url text,
  created_at timestamptz default now(),
  unique(user_id, product_id, size)
);

create index if not exists cart_items_user_id_idx on public.cart_items(user_id);

drop policy if exists "Users can manage own cart" on public.cart_items;
alter table public.cart_items enable row level security;

create policy "Users can manage own cart"
  on public.cart_items for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- =============================================================================
-- 5. HELPER: update updated_at
-- =============================================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists orders_updated_at on public.orders;
create trigger orders_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();
