ALTER TABLE users
  CHANGE COLUMN username email VARCHAR(255) NOT NULL,
  ADD UNIQUE KEY unique_email (email);
