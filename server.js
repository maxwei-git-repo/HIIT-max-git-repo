const express = require('express'); // Import express framework
const bodyParser = require('body-parser'); // Import body-parser middleware for JSON parsing
const path = require('path'); // Import path module for handling file paths

const app = express(); // Initialize an Express app
const PORT = process.env.PORT || 8080; // Set the port to 8080 or from the environment variable

// Middleware for JSON parsing
app.use(bodyParser.json());

// Serve static files from the 'web' directory
app.use('/',express.static(path.join(__dirname, 'web')));

// Serve static files from the 'app' directory
app.use('/app',express.static(path.join(__dirname, 'app')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'web', 'index.html'));
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`); // Log message when the server starts
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message); // Log the error for debugging
  res.status(500).json({ error: 'Internal Server Error' }); // Send a generic error response
});

// Graceful shutdown handling
function handleShutdown(signal) {
  console.log(`Received ${signal}. Closing server...`);
  // Close the server gracefully
  server.close(() => {
    console.log('Server closed gracefully.');
    process.exit(0);
  });
}

// Handle termination signals for graceful shutdown
process.on('SIGTERM', handleShutdown);
process.on('SIGINT', handleShutdown);
