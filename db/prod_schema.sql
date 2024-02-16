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
