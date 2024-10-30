const express = require('express');
const getDbConnection = require('../db/dbConnection'); // Import the database connection function
const router = express.Router();

// Create a new workout
router.post('/workout/create', (req, res) => {
  const db = getDbConnection();
  const { name } = req.body;

  // Validate input
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'Invalid workout name. Please provide a valid name.' });
  }

  // Insert workout into the database
  db.run('INSERT INTO workouts (name) VALUES (?)', [name.trim()], function(err) {
    if (err) {
      db.close();
      return res.status(500).json({ error: 'Failed to create workout. Please try again.' });
    }
    res.json({ message: 'Workout created successfully.', workoutId: this.lastID });
    db.close();
  });
});

// Add an activity to an existing workout
router.post('/workout/add-activity', (req, res) => {
  const db = getDbConnection();
  const { workoutId, name, description, duration } = req.body;

  // Validate inputs
  if (!workoutId || typeof workoutId !== 'number') {
    return res.status(400).json({ error: 'Invalid workout ID. Please provide a valid number.' });
  }
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'Invalid activity name. Please provide a valid name.' });
  }
  if (!duration || typeof duration !== 'number' || duration <= 0) {
    return res.status(400).json({ error: 'Invalid duration. Please provide a positive number.' });
  }

  // Insert activity into the database
  db.run(
    `INSERT INTO activities (workout_id, name, description, duration) 
     VALUES (?, ?, ?, ?)`,
    [workoutId, name.trim(), description || '', duration],
    function(err) {
      if (err) {
        db.close();
        return res.status(500).json({ error: 'Failed to add activity. Please try again.' });
      }
      res.json({ message: 'Activity added successfully.', activityId: this.lastID });
      db.close();
    }
  );
});

// Get all activities for a specific workout
router.post('/workout/activities', (req, res) => {
  const db = getDbConnection();
  const { workoutId } = req.body;

  // Validate workout ID
  if (!workoutId || typeof workoutId !== 'number') {
    return res.status(400).json({ error: 'Invalid workout ID. Please provide a valid number.' });
  }

  // Retrieve activities from the database
  db.all(
    'SELECT * FROM activities WHERE workout_id = ?',
    [workoutId],
    (err, rows) => {
      if (err) {
        db.close();
        return res.status(500).json({ error: 'Failed to retrieve activities. Please try again.' });
      }
      if (rows.length === 0) {
        res.json({ message: 'No activities found for this workout.' });
      } else {
        res.json({ activities: rows });
      }
      db.close();
    }
  );
});

module.exports = router;