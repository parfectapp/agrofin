-- ============================================================
-- AGROFIN · Esquema de Supabase (backend en la nube)
-- Pégalo en: Supabase → tu proyecto → SQL Editor → New query → Run
-- ============================================================

-- Un documento JSON por usuario (todos sus datos del invernadero).
create table if not exists public.greenhouse (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Seguridad: cada quien SOLO puede ver y editar su propia fila.
alter table public.greenhouse enable row level security;

drop policy if exists "own_select" on public.greenhouse;
create policy "own_select" on public.greenhouse
  for select using (auth.uid() = user_id);

drop policy if exists "own_insert" on public.greenhouse;
create policy "own_insert" on public.greenhouse
  for insert with check (auth.uid() = user_id);

drop policy if exists "own_update" on public.greenhouse;
create policy "own_update" on public.greenhouse
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Listo. La app guarda/lee aquí el JSON de cada cuenta.
