const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Define the path to the database file
const dbPath = path.join(__dirname, 'hiit.db');

// Check if the 'db' directory exists, and create it if it doesn't
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Create a new SQLite database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database at', dbPath);
  }
});

// Function to create the required tables
db.serialize(() => {
  // Create the 'workouts' table if it doesn't exist
  db.run(`CREATE TABLE IF NOT EXISTS workouts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )`, (err) => {
    if (err) {
      console.error("Error creating 'workouts' table:", err.message);
    } else {
      console.log("'workouts' table created or already exists.");
    }
  });

  // Create the 'activities' table if it doesn't exist
  db.run(`CREATE TABLE IF NOT EXISTS activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    workout_id INTEGER,
    name TEXT NOT NULL,
    description TEXT,
    duration INTEGER NOT NULL,
    FOREIGN KEY (workout_id) REFERENCES workouts(id) ON DELETE CASCADE
  )`, (err) => {
    if (err) {
      console.error("Error creating 'activities' table:", err.message);
    } else {
      console.log("'activities' table created or already exists.");
    }
  });
});

// Close the database connection
db.close((err) => {
  if (err) {
    console.error('Error closing the database connection:', err.message);
  } else {
    console.log('Database connection closed.');
  }
});

module.exports = db;