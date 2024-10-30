// Load the audio files: one for activity completion and one for break end
let activityCompleteSound = new Audio('activityEnd.mp3'); // Path for activity completion sound
let breakEndSound = new Audio('breakEnd.mp3'); // Path for break end sound

// Play the activity complete sound
function playActivityCompleteSound(callback) {
  activityCompleteSound.play().then(() => {
    activityCompleteSound.onended = callback; // Call the callback once the sound ends
  }).catch((err) => {
    console.error('Error playing activity complete sound:', err);
    callback(); // Proceed to the next step if audio fails
  });
}

// Play the break end sound
function playBreakEndSound(callback) {
  breakEndSound.play().then(() => {
    breakEndSound.onended = callback; // Call the callback once the sound ends
  }).catch((err) => {
    console.error('Error playing break end sound:', err);
    callback(); // Proceed to the next step if audio fails
  });
}

// Make functions available globally in the browser
if (typeof window !== 'undefined') {
  window.playActivityCompleteSound = playActivityCompleteSound;
  window.playBreakEndSound = playBreakEndSound;
}