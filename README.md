# HIIT Workout Tool

## Overview
The HIIT Workout Tool is a customizable web application that allows users to create, manage, and perform High-Intensity Interval Training (HIIT) workouts. The app enables users to create workouts from scratch, add activities with adjustable difficulty levels, and provides audio cues for transitions between activities.

## Features
1. **Create a Workout**: 
   - Users can create a new workout by entering a name. The app generates a unique workout ID, which is displayed to the user for reference.

2. **Add Activities to the Workout**: 
   - After creating a workout, users can add activities by entering the activity name, description, and duration (in seconds).
   - The added activities are displayed in real-time, allowing users to view all activities included in the workout.

3. **Start, Pause, Resume, and Stop the Workout**: 
   - Users can start the workout once activities are added. The app displays and counts down the duration for each activity.
   - The workout can be paused, resumed, or stopped at any time, providing complete control over the session.

4. **Adjust Difficulty Levels**: 
   - Users can set the difficulty level ("easy", "normal", "hard") to modify the activity durations. For example, "hard" decreases rest times, while "easy" increases them.

5. **Audio Cues**: 
   - The app plays a beep sound at the end of each activity, signaling users to switch to the next activity.

6. **Display Activities**: 
   - As activities are added, they are dynamically listed on the page, showing the name, description, and duration.

## Project Structure
```bash
hiit-app/
│
├── web/                     # Publicly accessible frontend files
│   ├── index.html               # Frontend interface for creating and starting workouts
│   ├── styles.css               # Basic CSS styling for the page
│   ├── audioCues.js             # Handles audio cues during the workout
│   ├── activityEnd.mp3          # Audio file for cues
│   └── breakEnd.mp3             # Audio file for cues
│
├── app/                     # Backend logic and server files
│   ├── workoutTimer.js          # JavaScript logic for managing workout timers
│   ├── createWorkoutRoutes.js   # Handles workout and activity creation routes
│   └── difficultyAdjustment.js  # Handles difficulty adjustment for activities
│
├── db/                      # Database-related files
│   ├── setupDb.js               # SQLite database setup script
│   ├── dbConnection.js          # Function to create a new database connection
│   └── hiit.db                  # SQLite database file
│    
├── server.js                # Main server file to launch the application
├── package.json             # Project configuration and dependencies
└── README.md                # Description of the project and instructions


## Prerequisites
1. Node.js: Ensure Node.js is installed on your system to run the server and backend scripts.
2. SQLite: SQLite is used as the database for this project.


## Installation and Setup
1. **Clone the repository**:

     - git clone https://github.com/maxwei-git-repo/HIIT-max-git-repo.git
     - cd HIIT-max-git-repo

2. **Install dependencies**:

     - npm install

3. **Set up the database**:

* Run the database setup script to create the required tables,this will create the necessary tables in the SQLite database.

     - npm run setup

4. **Start the server**:

* Launch the server with the following command:

     - npm start

* The server will run on http://localhost:8080

5. **Open the application**:

* Open a browser and navigate to http://localhost:8080.
* Use the interface to create a workout, add activities, and manage your workout session.

## Usage

1. **Create a Workout**:
   - Enter a workout name in the provided field and click the "Create Workout" button.
   
2. **Add Activities**:
   - After creating a workout, enter the activity name, description, activity duration and break duration. 
   - Click the "Add Activity" button to add the activity to the workout.
   - The added activities will be displayed below the input fields, showing the name, description, and duration.

3. **Start, Pause, Resume, or Stop the Workout**:
   - Use the provided buttons to control the workout timer:
     - **Start**: Begins the workout and starts counting down the duration for each activity.
     - **Pause**: Pauses the countdown, allowing you to take a break.
     - **Resume**: Resumes the workout from where it was paused.
     - **Stop**: Stops the workout completely, resetting the timer.

4. **Adjust Difficulty**:
   - Set the difficulty level before adding activities to adjust activity durations accordingly.
   - For example, selecting "hard" reduces rest times, while "easy" increases them.

5. **Audio Cues**:
   - The app plays a **activityEnd.mp3 sound** at the end of each activity, and plays a **breakEnd.mp3 sound** at the end of break time,signaling when to transition to the next   activity.
   - Ensure your device’s volume is turned on to hear the audio cues.
   - The audio cues are automatically managed by the **`audioCues.js`** script.


## Troubleshooting

- **Cannot Connect to the Database**:
  - Ensure that the `hiit.db` file is present in the `db` folder. If it's missing, run the setup script:
    ```bash
    npm run setup
    ```
  - Check for read/write permissions in the `db` directory.
  - If the issue persists, verify that the database file path in `dbConnection.js` is correct and points to the `hiit.db` file.

- **Server Not Starting**:
  - Make sure that all dependencies are installed by running:
    ```bash
    npm install
    ```
  - Ensure that the port (8080) is not in use by another application. If the port is occupied, use a different port:
    ```bash
    PORT=your_port_number npm start
    ```
  - Check for any syntax errors in `server.js` or missing modules, which can prevent the server from starting.

- **Error: `Cannot find module`**:
  - Ensure that the required modules are installed and listed in `package.json`.
  - If the error persists, try deleting the `node_modules` folder and reinstalling the dependencies:
    ```bash
    rm -rf node_modules
    npm install
    ```

- **Audio Cues Not Playing**:
  - Ensure the `audio.mp3` file is present in the `web` folder.
  - Verify that your browser supports audio playback. Try using a different browser to see if the issue persists.
  - Clear the browser cache or reload the page to ensure the audio file is correctly loaded.

## Additional Notes
- This project is designed for educational purposes and does not use third-party libraries beyond express and sqlite3
- Adjust the code as needed to expand features or improve performance.

## License
* This project is licensed under the MIT License.
