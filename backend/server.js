require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Optionally serve the frontend from the same server (handy for deployment)
app.use(express.static(path.join(__dirname, '..', 'frontend')));

const FIELDS = ['book_title', 'author', 'meeting_date', 'location', 'host_name', 'attendees', 'discussion_notes'];

function pick(body) {
  const data = {};
  for (const f of FIELDS) if (body[f] !== undefined) data[f] = body[f];
  return data;
}

// GET /api/meetings -> list all
app.get('/api/meetings', (req, res) => {
  const rows = db.prepare('SELECT * FROM meetings ORDER BY meeting_date DESC, id DESC').all();
  res.json(rows);
});

// GET /api/meetings/:id -> get one
app.get('/api/meetings/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM meetings WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Meeting not found' });
  res.json(row);
});

// POST /api/meetings -> create
app.post('/api/meetings', (req, res) => {
  const data = pick(req.body);
  if (!data.book_title || !String(data.book_title).trim()) {
    return res.status(400).json({ error: 'book_title is required' });
  }
  const cols = Object.keys(data);
  const info = db
    .prepare(`INSERT INTO meetings (${cols.join(', ')}) VALUES (${cols.map(() => '?').join(', ')})`)
    .run(...Object.values(data));
  const created = db.prepare('SELECT * FROM meetings WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json(created);
});

// PUT /api/meetings/:id -> update
app.put('/api/meetings/:id', (req, res) => {
  const existing = db.prepare('SELECT * FROM meetings WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Meeting not found' });

  const data = pick(req.body);
  if (data.book_title !== undefined && !String(data.book_title).trim()) {
    return res.status(400).json({ error: 'book_title cannot be empty' });
  }
  const cols = Object.keys(data);
  if (cols.length === 0) return res.status(400).json({ error: 'No valid fields supplied' });

  db.prepare(
    `UPDATE meetings SET ${cols.map((c) => `${c} = ?`).join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
  ).run(...Object.values(data), req.params.id);

  res.json(db.prepare('SELECT * FROM meetings WHERE id = ?').get(req.params.id));
});

// DELETE /api/meetings/:id -> delete
app.delete('/api/meetings/:id', (req, res) => {
  const info = db.prepare('DELETE FROM meetings WHERE id = ?').run(req.params.id);
  if (info.changes === 0) return res.status(404).json({ error: 'Meeting not found' });
  res.json({ message: 'Meeting deleted', id: Number(req.params.id) });
});

// JSON 404 for unknown API routes
app.use('/api', (req, res) => res.status(404).json({ error: 'Route not found' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
