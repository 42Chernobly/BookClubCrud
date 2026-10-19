require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite'); // built into Node 22.5+, nothing to install

const dbFile = process.env.DB_FILE || './bookclub.db';
const db = new DatabaseSync(path.resolve(__dirname, dbFile));

// Create the table and seed 10 sample records on first run
const tableExists = db
  .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='meetings'")
  .get();

if (!tableExists) {
  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  db.exec(schema);
  console.log('Database initialised with schema and sample data.');
}

module.exports = db;
