const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Function to create and return a new database connection
function getDbConnection() {
  const dbPath = path.join(__dirname, 'hiit.db');
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error(`Error opening database: ${err.message}`);
    } else {
      console.log("Connected to the 'hiit.db' database.");
    }
  });

  // Handle database errors globally
  db.on('error', (err) => {
    console.error(`Database error: ${err.message}`);
  });

  return db;
}

// Function to close the database connection
function closeDbConnection(db) {
  if (db) {
    db.close((err) => {
      if (err) {
        console.error(`Error closing database: ${err.message}`);
      } else {
        console.log("Database connection closed.");
      }
    });
  }
}

module.exports = {
  getDbConnection,
  closeDbConnection
};