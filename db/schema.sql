DROP DATABASE IF EXISTS code_clear_dev;
CREATE DATABASE code_clear_dev;
\c code_clear_dev;

DROP TABLE IF EXISTS stats;
CREATE TABLE stats (
  id SERIAL PRIMARY KEY, 
  uid TEXT,
  message_id TEXT,
  message TEXT,
  source_code TEXT,
  date TEXT DEFAULT CURRENT_DATE,
  week TEXT DEFAULT TO_CHAR(CURRENT_DATE, 'WW'),
  time TEXT DEFAULT CURRENT_TIME,
  severity INT
);

-- DROP TABLE IF EXISTS projects;
-- CREATE TABLE projects (
--   id SERIAL PRIMARY KEY, 
--   project_name TEXT NOT NULL,
--   contents TEXT NOT NULL,
--   date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
-- )
