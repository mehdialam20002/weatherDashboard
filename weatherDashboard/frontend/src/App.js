import React, { useState } from 'react';
import SearchCity from './components/SearchCity';
import WeatherDisplay from './components/WeatherDisplay';
import Favorites from './components/Favorites';
import './styles.css';

const App = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [isCelsius, setIsCelsius] = useState(true); 
    const toggleTemperatureUnit = () => {
        setIsCelsius((prev) => !prev);
    };

    return (
        <div className="app">
            <h1>Weather Dashboard</h1>
            <SearchCity 
                setWeatherData={setWeatherData} 
                setForecastData={setForecastData} 
                favorites={favorites} 
                setFavorites={setFavorites} 
            />
            <br/>
              <button onClick={toggleTemperatureUnit}>
                Switch to {isCelsius ? 'Fahrenheit' : 'Celsius'}
            </button>
            {weatherData && (
                <WeatherDisplay 
                    weatherData={weatherData} 
                    forecastData={forecastData} 
                    isCelsius={isCelsius}
                />
            )}
            <Favorites 
                favorites={favorites} 
                setFavorites={setFavorites} 
                isCelsius={isCelsius} 
                toggleTemperatureUnit={toggleTemperatureUnit} 
            />
          
        </div>
    );
};

export default App;
