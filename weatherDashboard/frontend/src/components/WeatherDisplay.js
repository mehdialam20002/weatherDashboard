import React from 'react';
import '../styles.css';

const WeatherDisplay = ({ weatherData, forecastData, isCelsius }) => {
    
    const convertTemperature = (kelvin) => {
        if (isCelsius) {
            return (kelvin - 273.15).toFixed(2) + ' °C';
        } else {
            return ((kelvin - 273.15) * 9/5 + 32).toFixed(2) + ' °F'; 
        }
    };

    return (
        <div>
            <h2>Current Weather in {weatherData.name}</h2>
            <p>Temperature: {convertTemperature(weatherData.main.temp)}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Condition: {weatherData.weather[0].description}</p>

            <h2>5-Day Forecast</h2>
            <div className="forecast-container">
                {forecastData && forecastData.map((item, index) =>
                    index % 8 === 0 && (
                        <div key={item.dt} className="forecast-item">
                            <h3>{new Date(item.dt * 1000).toLocaleDateString()}</h3>
                            <p>Temperature: {convertTemperature(item.main.temp)}</p>
                            <p>Condition: {item.weather[0].description}</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default WeatherDisplay;
