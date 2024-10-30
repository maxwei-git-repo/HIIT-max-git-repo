let currentActivityIndex = 0; // Tracks the current activity index
let timer; // Holds the interval timer reference
let isPaused = false; // Tracks whether the workout is paused
let remainingDuration = 0; // Tracks the remaining duration of the current activity
let activitiesList = []; // Holds the activities array
let breakDuration = 0; // Holds the break duration
let originalBreakDuration = 0; // Stores the original break duration for resets

// Start the workout from the beginning
function startWorkout(activities, customBreakDuration = 0) {
  if (!Array.isArray(activities) || activities.length === 0) {
    console.error("No activities available to start.");
    return;
  }
  currentActivityIndex = 0;
  isPaused = false;
  activitiesList = activities; // Set the global activities array
  originalBreakDuration = customBreakDuration; // Store original break duration for resets
  remainingDuration = activitiesList[currentActivityIndex].duration; // Set the remaining duration for the first activity
  startActivity(); // Start the first activity
}

// Start or resume an activity
function startActivity() {
  const activity = activitiesList[currentActivityIndex];
  if (!activity) {
    console.error("No activity found.");
    return;
  }

  updateTimerDisplay(activity.name, remainingDuration);

  // Set the interval only when resuming from a paused state or starting a new activity
  if (!timer) {
    timer = setInterval(() => {
      if (!isPaused) {
        remainingDuration--;

        // Prevent the timer from going negative
        if (remainingDuration >= 0) {
          updateTimerDisplay(activity.name, remainingDuration);
        } else {
          clearInterval(timer);
          timer = null; // Reset the timer reference

          // Check if it's the last activity
          if (currentActivityIndex === activitiesList.length - 1) {
            playActivityCompleteSound(() => {
              updateTimerDisplay("Workout complete!", 0);
            });
          } else {
            playActivityCompleteSound(() => handleBreak()); // Play sound and handle break
          }
        }
      }
    }, 1000);
  }
}

// Handle the break time
function handleBreak() {
  breakDuration = originalBreakDuration; // Reset the break duration for each break

  if (breakDuration > 0) {
    updateTimerDisplay("Break", breakDuration);

    timer = setInterval(() => {
      if (!isPaused) {
        breakDuration--;

        if (breakDuration >= 0) {
          updateTimerDisplay("Break", breakDuration);
        } else {
          clearInterval(timer);
          timer = null; // Reset the timer reference

          // Move to the next activity
          playBreakEndSound(() => {
            currentActivityIndex++;
            if (currentActivityIndex < activitiesList.length) {
              remainingDuration = activitiesList[currentActivityIndex].duration; // Set the duration for the next activity
              startActivity(); // Start the next activity
            }
          });
        }
      }
    }, 1000);
  } else {
    // No break, move to the next activity immediately
    currentActivityIndex++;
    if (currentActivityIndex < activitiesList.length) {
      remainingDuration = activitiesList[currentActivityIndex].duration; // Set the duration for the next activity
      startActivity();
    }
  }
}

// Pause the workout
function pauseWorkout() {
  isPaused = true; // Set the paused flag to true
  clearInterval(timer); // Stop the timer to pause
  timer = null; // Reset the timer reference to avoid duplicate intervals
}

// Resume the workout
function resumeWorkout() {
  if (isPaused && remainingDuration > 0) {
    isPaused = false; // Reset the paused flag
    startActivity(); // Continue the current activity from remaining duration
  } else {
    console.error("Cannot resume. No activity in progress.");
  }
}

// Stop the workout
function stopWorkout() {
  clearInterval(timer); // Stop the timer
  timer = null; // Reset the timer reference
  updateTimerDisplay("Workout stopped.", 0); // Update the display
  currentActivityIndex = 0; // Reset the activity index
  remainingDuration = 0; // Reset the remaining duration
  isPaused = false; // Reset the paused flag
}

// Function to update the timer display
function updateTimerDisplay(activityName, duration) {
  const timerDisplay = document.getElementById("timer");
  if (duration >= 0) {
    timerDisplay.innerText = `${activityName}: ${duration}s remaining`;
  }
}

// Make functions globally accessible
if (typeof window !== 'undefined') {
  window.startWorkout = startWorkout;
  window.pauseWorkout = pauseWorkout;
  window.resumeWorkout = resumeWorkout;
  window.stopWorkout = stopWorkout;
}