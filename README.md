# WeatherWise App

WeatherWise is a simple web application that provides current weather and a 5-day forecast for a given city. It includes user authentication (signup and login) to protect access to the weather features.

## Features

  * **User Authentication:**
      * User registration (Sign Up)
      * User login
      * User logout
      * Basic client-side validation for signup (e.g., password length, password match, username uniqueness)
      * User credentials stored in `localStorage` (for demonstration purposes only, **not secure for production**)
  * **Weather Forecasting:**
      * Fetches current weather and a 5-day forecast using the OpenWeatherMap API.
      * Displays current temperature, description, humidity, wind speed, and "feels like" temperature.
      * Provides an hourly forecast for today.
      * Shows a 5-day daily forecast including average, min/max temperatures, and conditions.
      * User-friendly interface with weather emojis.
      * Loading spinner while fetching data.
      * Error handling for API requests and invalid input.
  * **Responsive Design:** Adapts to different screen sizes for a good user experience on various devices.

## Technologies Used

  * **HTML5:** Structure of the web pages.
  * **CSS3:** Styling and responsive design.
  * **JavaScript (ES6+):** Client-side logic for authentication and weather data fetching/rendering.
  * **OpenWeatherMap API:** For fetching weather data.

## Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd WeatherWise-App
    ```

2.  **Open `index.html`:**
    Simply open the `index.html`, `login.html`, or `signup.html` file in your web browser. Due to the use of `localStorage` and client-side JavaScript, a local server is not strictly necessary but can be used.

3.  **Obtain an OpenWeatherMap API Key:**

      * Go to [OpenWeatherMap](https://openweathermap.org/api) and sign up for a free account.
      * Generate an API key.

4.  **Update API Key (Optional but Recommended for Full Functionality):**

      * Open `script.js`.
      * Locate the line:
        ```javascript
        const openWeatherApiKey = 'YOUR_OPENWEATHER_API_KEY'; // Replace with your actual API key
        ```
      * Replace `'YOUR_OPENWEATHER_API_KEY'` with the API key you obtained from OpenWeatherMap.
        (Note: In the provided `script.js`, a key is already present (`'21f9e07d5603f2234347ea19b2b6ba8c'`). For a production application, it's best practice not to hardcode API keys directly in client-side code).

## Usage

1.  **Sign Up:** Navigate to `signup.html` to create a new account.
2.  **Log In:** After signing up (or if you already have an account), go to `login.html` to log in.
3.  **Get Weather:** Once logged in, you will be redirected to `index.html`. Enter a city name in the input field and click "Get Weather" to see the forecast.
4.  **Logout:** Click the "Logout" button in the header to end your session.

## Project Structure

```
.
├── index.html          // Main weather display page
├── login.html          // User login page
├── signup.html         // User registration page
├── auth.js             // Handles user authentication logic (signup, login, logout)
├── script.js           // Handles weather API calls and rendering
├── style.css           // Contains all the CSS styling for the application
└── weather.jpg         // Background image for auth forms
```

## Important Security Note

**The current authentication system uses `localStorage` to store usernames and passwords in plain text.** This is **NOT secure** and is **ONLY for demonstration purposes**. For any production application, you **must** implement a robust backend authentication system that securely handles user data (e.g., hashing passwords, using JWTs, secure session management).

-----
