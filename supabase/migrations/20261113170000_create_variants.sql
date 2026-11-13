-- Gemeinsam gespeicherte Varianten des Wohnzimmer-Planers
-- Wird über die Supabase-GitHub-Integration beim Push auf main eingespielt ("Deploy to production").
-- Idempotent, falls die Tabelle schon von Hand im SQL-Editor angelegt wurde.

create table if not exists public.variants (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) <= 80),
  data jsonb not null check (pg_column_size(data) < 50000),
  created_at timestamptz not null default now()
);

alter table public.variants enable row level security;

drop policy if exists "anyone can read" on public.variants;
drop policy if exists "anyone can add" on public.variants;
drop policy if exists "anyone can delete" on public.variants;

create policy "anyone can read" on public.variants for select to anon using (true);
create policy "anyone can add" on public.variants for insert to anon with check (true);
create policy "anyone can delete" on public.variants for delete to anon using (true);

grant select, insert, delete on public.variants to anon;
