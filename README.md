# Weather App - Assessment

## Overview

This is a single-page web application built using React.js that allows users to search for and view current weather information for cities around the world. Users can add cities to a "favorites" list and manage their weather-related notes. The app is optimized for performance, featuring offline functionality and local weather access.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Folder Structure](#deployment)
- [Deployment Link](#deployment)
- [Technologies Used](#folder-structure)
- [License](#license)

## Features

1. **Default View**:

- Displays a list of the 15 largest cities by population, sorted alphabetically.
- Shows the current temperature for each city.
- Users can remove cities from this list.

2. **City Details**:

- Clicking on any city displays detailed weather information.
- Users can add, edit, and delete notes related to the city's weather.

3. **City Search**:

- Users can search for any city globally to retrieve weather information.

4. **Favorites**:

- Users can add or remove cities from their "favorites" list.
- Favorite cities are displayed at the top of the home screen in alphabetical order.

5. **Offline Functionality**:

- The app retains basic functionality when offline, including access to the cached weather data.
- Only the search feature requires internet access.

6. **Local Weather**:

- The app prompts users for permission to access their location and automatically displays detailed weather for the user’s city.

7. **Performance Optimization**:

- Efficient data fetching and caching to minimize API calls.

8. **UI/UX**:

- Clean, modern design with a focus on production-readiness.
- Styled using tailwindCSS.

9. **State Management**:

- The app is broken down into well-defined React components.
- Redux is used for state management, and TypeScript ensures type safety.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (version 14 or higher)
- [npm](https://www.npmjs.com/get-npm) or [Yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/drew-chidi/weather-app-irecharge.git

   ```

2. Navigate to the project directory:

   ```bash
   cd weather-app-irecharge

   ```

3. Install the dependencies:

   ```bash
   npm install

   ```

4. Create a .env file in the root directory and add your API keys:

   ```bash
   VITE_WEATHERSTACK_URL=https://api.weatherstack.com
   VITE_ACCESS_KEY=your_weatherstack_api_key

   ```

### Running the App

1. Start the development server:

   ```bash
   npm run dev

   ```

2. Open your browser and navigate to http://localhost:5173 to see the app in action.

## Folder Structure

```bash
  weather-app/
├── public/               # Public assets
├── src/                  # Source code
│   ├── components/       # React components
│   ├── hooks/            # Custom hooks
│   ├── redux/            # Redux state management
│   ├── index.css/        # Global styles
│   ├── App.tsx           # Main app component
│   ├── main.tsx         # Entry point
├── .env                  # Environment variables
├── package.json          # NPM dependencies and scripts
├── README.md             # App documentation

```

## Deployment Link

[Weather App](https://weather-app-irecharge.vercel.app/)

## Technologies Used

- React.js for UI development
- Redux for state management
- TypeScript for type safety
- Weather API: Uses a weather service like weatherstack.com
- Local Storage: Persists data for offline use

## License

This project is licensed under the MIT License. See the LICENSE file for details.
