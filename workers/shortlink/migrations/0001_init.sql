-- VL Tech Official short links | D1 schema v1
-- Designed and developed by Vijaya Kumar L (RisewithVJ)
CREATE TABLE IF NOT EXISTS links (
  code        TEXT PRIMARY KEY,
  url         TEXT NOT NULL,
  domain      TEXT NOT NULL,
  created_at  INTEGER NOT NULL,
  creator     TEXT,
  status      TEXT NOT NULL DEFAULT 'active',  -- active | disabled | blocked
  opens       INTEGER NOT NULL DEFAULT 0,      -- short link opened
  clicks      INTEGER NOT NULL DEFAULT 0,      -- visitor reached the destination
  last_click  INTEGER,
  note        TEXT,
  updated_at  INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS links_updated ON links(updated_at);
CREATE INDEX IF NOT EXISTS links_domain ON links(domain);

CREATE TABLE IF NOT EXISTS daily (
  code   TEXT NOT NULL,
  day    TEXT NOT NULL,                        -- YYYY-MM-DD (UTC)
  opens  INTEGER NOT NULL DEFAULT 0,
  clicks INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (code, day)
);
CREATE INDEX IF NOT EXISTS daily_day ON daily(day);

CREATE TABLE IF NOT EXISTS limits (
  key      TEXT PRIMARY KEY,                   -- e.g. create:<visitor-hash>:<hour>
  count    INTEGER NOT NULL,
  expires  INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS blocklist (
  domain   TEXT PRIMARY KEY,
  reason   TEXT,
  added_at INTEGER NOT NULL
);
