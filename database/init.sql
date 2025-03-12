CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE sessions (
  session_id UUID PRIMARY KEY,
  buttons JSON NOT NULL,
  combination_id VARCHAR(255),
  is_active BOOLEAN DEFAULT true
);