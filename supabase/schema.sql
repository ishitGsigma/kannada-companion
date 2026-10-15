create table if not exists public.saved_phrases (
  user_id uuid not null references auth.users(id) on delete cascade,
  phrase_key text not null,
  phrase jsonb not null,
  created_at timestamptz not null default now(),
  primary key (user_id, phrase_key)
);

create table if not exists public.learning_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  phrase_key text not null,
  status text not null check (status in ('known', 'review')),
  updated_at timestamptz not null default now(),
  primary key (user_id, phrase_key)
);

alter table public.saved_phrases enable row level security;
alter table public.learning_progress enable row level security;

drop policy if exists "Users manage their saved phrases" on public.saved_phrases;
create policy "Users manage their saved phrases"
on public.saved_phrases for all to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users manage their learning progress" on public.learning_progress;
create policy "Users manage their learning progress"
on public.learning_progress for all to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

grant select, insert, update, delete on public.saved_phrases to authenticated;
grant select, insert, update, delete on public.learning_progress to authenticated;