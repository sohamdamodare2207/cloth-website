# Supabase SQL

## How to run

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → your project.
2. Go to **SQL Editor**.
3. Paste the contents of `schema.sql` and click **Run**.

## What it creates

| Table        | Purpose |
|-------------|---------|
| **profiles** | One row per user (synced from Auth). Add `full_name`, etc. |
| **orders**   | One row per order: `user_id`, `total_amount` (INR), `status`. |
| **order_items** | Line items: `order_id`, `product_id`, `product_name`, `size`, `quantity`, `unit_price`, `image_url`. |
| **cart_items** | Optional: persist cart in DB by user (e.g. for “save cart” or multi-device). |

All tables use **Row Level Security (RLS)** so users only see and change their own data.

## Notes

- Prices are stored in **INR** (paise or rupees; use same unit everywhere, e.g. rupees: `15799`).
- `product_id` is text and matches your app’s product ids (e.g. `"1"`, `"2"`).
