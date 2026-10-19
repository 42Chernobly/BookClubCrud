-- Question 8: Book Club Meeting Page (resource: meetings, table: meetings)
CREATE TABLE IF NOT EXISTS meetings (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  book_title       VARCHAR(200) NOT NULL,
  author           VARCHAR(150),
  meeting_date     DATE,
  location         VARCHAR(150),
  host_name        VARCHAR(120),
  attendees        INTEGER DEFAULT 0,
  discussion_notes TEXT,
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO meetings (book_title, author, meeting_date, location, host_name, attendees, discussion_notes) VALUES
('Things Fall Apart', 'Chinua Achebe', '2026-01-10', 'Library Room 1', 'Mary Banda', 12, 'Colonialism and tradition in Igbo society.'),
('Half of a Yellow Sun', 'Chimamanda Ngozi Adichie', '2026-01-24', 'Student Centre', 'John Phiri', 9, 'The Biafran war through three perspectives.'),
('The River Between', 'Ngugi wa Thiong''o', '2026-02-07', 'Library Room 2', 'Grace Mwansa', 11, 'Conflict between faith and custom.'),
('Americanah', 'Chimamanda Ngozi Adichie', '2026-02-21', 'Cafeteria Hall', 'Peter Zulu', 14, 'Identity, race and migration.'),
('Born a Crime', 'Trevor Noah', '2026-03-07', 'Library Room 1', 'Mary Banda', 15, 'Growing up under apartheid with humour.'),
('Purple Hibiscus', 'Chimamanda Ngozi Adichie', '2026-03-21', 'Student Centre', 'Chanda Mulenga', 8, 'Family, faith and control.'),
('Weep Not, Child', 'Ngugi wa Thiong''o', '2026-04-04', 'Library Room 2', 'John Phiri', 10, 'Education and hope during Mau Mau uprising.'),
('So Long a Letter', 'Mariama Ba', '2026-04-18', 'Cafeteria Hall', 'Grace Mwansa', 13, 'Marriage, widowhood and womanhood.'),
('The Alchemist', 'Paulo Coelho', '2026-05-02', 'Library Room 1', 'Peter Zulu', 16, 'Following personal legends.'),
('Atomic Habits', 'James Clear', '2026-05-16', 'Student Centre', 'Chanda Mulenga', 18, 'Small habits and compounding change.');
