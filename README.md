# Habit Tracker

You can view the Driven Eats App live at <a href="https://track-it-two-jade.vercel.app/" target="_blank">https://track-it-two-jade.vercel.app/</a>.

**TrackIt** is a mobile application that allows users to track their habits. It includes features like user registration, login, habit creation, and daily habit tracking. The app is built using React and styled-components, and it communicates with a mock API for user and habit data management.

## Technologies Used:
- React: For building the user interface and managing state.
- Styled-components: For styling the application with a component-based approach.
- Context API: For managing global state (e.g., user login status).
- Day.js: For handling and displaying the current date.
- react-loader-spinner: For loading animations during user interactions.
- Vercel: For deploying the app.

## Features:
- User Registration: Users can sign up by providing their email, password, and a profile image.
- User Login: Users can log in with their email and password.
- Create Habits: Users can add new habits by specifying the name and the days of the week they want to perform the habit.
- Track Habits: Users can mark their habits as done or undone for today.
- Persistence: The app stores user credentials in local storage to maintain the user's login status across sessions.

## API Endpoints:
- POST /auth/sign-up: Register a new user.
- POST /auth/login: Log in an existing user.
- POST /habits: Create a new habit.
- GET /habits: List all habits.
- GET /habits/today: Get today's habits.
- POST /habits/{id}/check: Mark a habit as completed.
- POST /habits/{id}/uncheck: Unmark a habit as completed.

## How to Test:
- Clone the Repository:
```json
git clone https://github.com/your-username/habit-tracker.git
cd habit-tracker
```

- Install Dependencies:
```json
npm install
```

- Start the Development Server:
```json
npm start
```

- Open your browser and navigate to http://localhost:3000 to test the app.

- Deployment:
The app is deployed on Vercel. View the live app here.

### Notes:
- The app is designed for mobile screens.
- Use localStorage to maintain user login state.
- The API used is a mock API provided for this bootcamp project.
