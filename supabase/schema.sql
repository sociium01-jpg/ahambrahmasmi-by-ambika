-- ============================================================================
-- Ahambrahmasmi by Ambika — Supabase Schema Migration
-- Run this inside the Supabase SQL Editor
-- ============================================================================

-- 1. Bookings table (Stage 3)
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  course text check (course in ('whole', 'intro', 'tools')),
  amount_inr int,
  name text,
  whatsapp text,
  email text,
  call_time text,
  note text,
  razorpay_order_id text,
  razorpay_payment_id text,
  status text default 'pending' check (status in ('pending', 'paid', 'failed'))
);

-- Enable RLS with NO public policies — only the server (service role key) reads/writes.
alter table public.bookings enable row level security;

create index if not exists idx_bookings_razorpay_order_id
  on public.bookings (razorpay_order_id);

-- 2. Reviews table (Stage 4)
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  course text not null check (course in ('The whole path', 'Introduction to LOA', 'Tools for Emotional Mastery')),
  written_review text not null,
  photo_url text,
  video_url text,
  approved boolean default false
);

-- Enable RLS with NO public write policies — reads/writes go through server API / server components.
alter table public.reviews enable row level security;
