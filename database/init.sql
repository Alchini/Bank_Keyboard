CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE sessions (
  session_id UUID PRIMARY KEY,
  buttons JSON NOT NULL,
  is_active BOOLEAN DEFAULT true
);