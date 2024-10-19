# Weather Dashboard
assignment for Aviara Labs

# Overview

This Weather Dashboard allows users to search for a city to see the current weather and a 5-day forecast. 

It also allows saving favorite cities and switching between Celsius and Fahrenheit.

The app uses the OpenWeatherMap API and a JSON server to store favorite cities. 

Additionally, it remembers the last searched city using local storage.

# Features

Search for a city and display current weather and a 5-day forecast.

Add cities to a list of favorites.

Remove cities from the list of favorites.

Switch between Celsius and Fahrenheit.

Display weather data for favorite cities.

Local storage to remember the last searched city.


# Installation

Prerequisites

Node.js and npm installed on your system

OpenWeatherMap API key (you can obtain it here).

# Steps
Clone this repository:

git clone https://github.com/yourusername/weather-dashboard.git

cd weather-dashboard

# Install dependencies:

npm install

Start the JSON server for storing favorites:


npm run json-server

# Obtain an API key from OpenWeatherMap:
Sign up at https://home.openweathermap.org/users/sign_up.

Go to the API Keys section and generate a key.

Create a .env file in the root directory and add your API key:

# makefile


REACT_APP_OPENWEATHER_API_KEY=your_api_key_here

# Start the application:

npm start

The app will open at http://localhost:3000.

# Usage
Enter a city name in the search bar to see its current weather and forecast.

Add cities to favorites, and they will persist in the JSON server.

You can switch temperature units using the toggle button.
