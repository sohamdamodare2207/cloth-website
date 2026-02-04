# Database Setup Required

The application requires Supabase database tables to be created before sign-up/login works.

## Steps to Fix the Database Error:

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard
2. **Select your project** (cloth-website)
3. **Navigate to SQL Editor** (left sidebar)
4. **Create a new query**
5. **Copy and paste the entire contents of `supabase/schema.sql`**
6. **Click "Run"** to execute the SQL

This will create the necessary tables:
- `profiles` - stores user profile information
- `orders` - stores customer orders
- `order_items` - stores items in each order
- `cart_items` - stores shopping cart items

Once the schema is created, sign-up and login will work properly!

## What the Schema Does:
- Creates user profile management
- Sets up Row Level Security (RLS) so users can only see their own data
- Creates triggers to automatically create a profile when a user signs up
- Sets up order management system
