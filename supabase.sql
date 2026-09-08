-- =========================================================
-- TOTAL GAMING ESPORTS STATS DATABASE
-- =========================================================

create table if not exists teams (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  short_name text,
  country text default 'India',
  logo_url text,
  created_at timestamptz default now()
);

create table if not exists players (
  id uuid primary key default gen_random_uuid(),
  team_id uuid references teams(id) on delete cascade,
  name text not null,
  role text,
  active boolean default true,
  avatar_url text,
  created_at timestamptz default now()
);

create table if not exists tournaments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  status text default 'upcoming'
    check (status in ('upcoming', 'ongoing', 'completed')),
  start_date date,
  end_date date,
  created_at timestamptz default now()
);

create table if not exists matches (
  id uuid primary key default gen_random_uuid(),
  tournament_id uuid not null references tournaments(id) on delete cascade,
  team_id uuid not null references teams(id) on delete cascade,
  match_number integer not null,
  match_date date not null,
  map text,
  placement integer not null check (placement >= 1),
  position_points integer not null default 0,
  total_kills integer not null default 0,
  total_points integer not null default 0,
  created_at timestamptz default now(),

  unique (tournament_id, team_id, match_number)
);

create table if not exists match_players (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references matches(id) on delete cascade,
  player_id uuid not null references players(id) on delete cascade,
  kills integer not null default 0 check (kills >= 0),
  points integer not null default 0,
  created_at timestamptz default now(),

  unique (match_id, player_id)
);

create table if not exists scoring_rules (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  kill_point integer not null default 1,
  placement_points jsonb not null,
  active boolean default true,
  created_at timestamptz default now()
);

-- =========================================================
-- DEFAULT TOTAL GAMING SCORING
-- =========================================================

insert into scoring_rules (
  name,
  kill_point,
  placement_points
)
values (
  'Free Fire Default',
  1,
  '{
    "1": 12,
    "2": 9,
    "3": 8,
    "4": 7,
    "5": 6,
    "6": 5,
    "7": 4,
    "8": 3,
    "9": 2,
    "10": 1,
    "11": 0,
    "12": 0
  }'::jsonb
)
on conflict (name) do nothing;

-- =========================================================
-- INDEXES
-- =========================================================

create index if not exists idx_players_team
on players(team_id);

create index if not exists idx_matches_tournament
on matches(tournament_id);

create index if not exists idx_matches_team
on matches(team_id);

create index if not exists idx_matches_date
on matches(match_date);

create index if not exists idx_match_players_match
on match_players(match_id);

create index if not exists idx_match_players_player
on match_players(player_id);
