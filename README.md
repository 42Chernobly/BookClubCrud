# Question 8 — Book Club Meeting Page (CRUD)

Single-table CRUD app: **SQLite + Node.js/Express REST API + HTML/JavaScript frontend**.
Resource: `meetings` · Table: `meetings`

## Project structure
```
book-club-crud/
├─ backend/
│  ├─ .env
│  ├─ package.json
│  ├─ schema.sql      (table + 10 sample INSERTs)
│  ├─ db.js           (opens SQLite, runs schema on first start)
│  └─ server.js       (Express API + CORS)
└─ frontend/
   ├─ index.html
   └─ app.js
```

## Table: meetings
| Column | Type |
|---|---|
| id | INTEGER PRIMARY KEY AUTOINCREMENT |
| book_title | VARCHAR(200) NOT NULL |
| author | VARCHAR(150) |
| meeting_date | DATE |
| location | VARCHAR(150) |
| host_name | VARCHAR(120) |
| attendees | INTEGER |
| discussion_notes | TEXT |
| created_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP DEFAULT CURRENT_TIMESTAMP (refreshed on every PUT) |

## Run locally
(Requires Node.js 22.5 or newer. SQLite is built into Node, so there is nothing native to compile.)
```
cd backend
npm install
npm start
```
API: http://localhost:3000/api/meetings
Frontend: open http://localhost:3000 (the server also serves `/frontend`), or open `frontend/index.html` directly.

## Endpoints
| Method | URL | Purpose |
|---|---|---|
| GET | /api/meetings | List all |
| GET | /api/meetings/:id | Get one |
| POST | /api/meetings | Create |
| PUT | /api/meetings/:id | Update |
| DELETE | /api/meetings/:id | Delete |

### Sample POST / PUT body (Postman → Body → raw → JSON)
```json
{
  "book_title": "Kafka on the Shore",
  "author": "Haruki Murakami",
  "meeting_date": "2026-11-01",
  "location": "Library Room 1",
  "host_name": "Mary Banda",
  "attendees": 10,
  "discussion_notes": "Magical realism and fate."
}
```

## Postman video checklist
1. GET `/api/meetings` – show the 10 seeded records.
2. GET `/api/meetings/1` – one record.
3. POST `/api/meetings` – show body and 201 response.
4. PUT `/api/meetings/11` – change a field; show updated_at changes.
5. DELETE `/api/meetings/11` – show success JSON, then GET it again (404).

## Deploying to the cloud
SQLite is a file, so pick a host with a persistent disk (Render, Railway, Fly.io) or use a hosted DB.
Render example:
1. Push this folder to GitHub.
2. New → Web Service → root directory `backend`, build `npm install`, start `npm start`.
3. Add a persistent disk and set `DB_FILE=/var/data/bookclub.db`.
4. Open `https://<your-app>.onrender.com/api/meetings` and share the four API links (GET, POST, PUT, DELETE) in the Google Form.
5. In `frontend/index.html`, before `app.js`, add `<script>window.API_BASE='https://<your-app>.onrender.com'</script>`
   (not needed if you use the URL served by the backend itself).

If your lecturer requires Supabase/Firebase, the same fields map directly to a `meetings` table in Supabase.
