const getDbConnection = require('../db/dbConnection'); // Import the database connection function

// Function to add activities with difficulty adjustment
function addActivityWithDifficulty(req, res) {
  const db = getDbConnection(); // Get a new database connection
  let { name, description, duration, difficulty, workoutId } = req.body;

  // Validate input data
  if (!workoutId || !name || !duration) {
    return res.status(400).json({ error: "Workout ID, name, and duration are required." });
  }

  // Adjust the duration based on the difficulty level
  try {
    if (difficulty === 'hard' && name.toLowerCase() === 'rest') {
      duration = Math.floor(duration * 0.8); // Decrease rest time by 20% for 'hard' difficulty
    } else if (difficulty === 'easy') {
      duration = Math.floor(duration * 1.2); // Increase rest time by 20% for 'easy' difficulty
    }

    // Insert the adjusted activity into the database
    const sql = `
      INSERT INTO activities (workout_id, name, description, duration)
      VALUES (?, ?, ?, ?)
    `;
    db.run(sql, [workoutId, name, description, duration], function (err) {
      if (err) {
        console.error("Error adding activity:", err.message);
        return res.status(500).json({ error: "Failed to add activity." });
      }
      res.json({ id: this.lastID }); // Return the ID of the added activity
    });
  } catch (error) {
    console.error("Error processing activity:", error.message);
    res.status(500).json({ error: "An unexpected error occurred." });
  } finally {
    db.close(); // Close the database connection
  }
}

module.exports = { addActivityWithDifficulty };