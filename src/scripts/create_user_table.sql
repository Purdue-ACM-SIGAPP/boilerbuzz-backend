CREATE TABLE IF NOT EXISTS appuser (
    userid SERIAL PRIMARY KEY
);

ALTER TABLE appuser 
ADD COLUMN IF NOT EXISTS clerk_user_id VARCHAR(255) UNIQUE;

CREATE INDEX IF NOT EXISTS idx_clerk_user_id ON appuser(clerk_user_id);