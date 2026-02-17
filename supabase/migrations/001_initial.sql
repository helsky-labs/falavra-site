-- 1. Licenses
create table licenses (
  id uuid primary key default gen_random_uuid(),
  license_key text unique not null,
  email text not null,
  major_version int not null default 1,
  stripe_payment_intent_id text,
  stripe_customer_id text,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- 2. License activations
create table license_activations (
  id uuid primary key default gen_random_uuid(),
  license_id uuid references licenses(id),
  machine_id text not null,
  machine_name text,
  os_version text,
  activated_at timestamptz default now(),
  last_validated_at timestamptz default now()
);

-- 3. Usage tracking (free tier limits)
create table usage_tracking (
  id uuid primary key default gen_random_uuid(),
  machine_id text not null,
  usage_date date not null default current_date,
  transcription_count int default 0,
  unique(machine_id, usage_date)
);

-- 4. Newsletter subscribers
create table newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  locale text default 'en',
  subscribed_at timestamptz default now(),
  unsubscribed_at timestamptz
);

-- Enable RLS on all tables (access via service_role key only)
alter table licenses enable row level security;
alter table license_activations enable row level security;
alter table usage_tracking enable row level security;
alter table newsletter_subscribers enable row level security;
