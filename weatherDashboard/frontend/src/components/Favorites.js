import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Favorites = ({ favorites, setFavorites, isCelsius, toggleTemperatureUnit }) => {
    const [storedFavorites, setStoredFavorites] = useState([]);
    const [favoriteWeatherData, setFavoriteWeatherData] = useState({});

    const fetchFavorites = async () => {
        const response = await axios.get('http://localhost:5000/favorites');
        setStoredFavorites(response.data);
    };

    const fetchWeatherData = async (city) => {
        const apiKey = '0be9ef9ff42870349b91e59e55303e56'; 
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
            );
            setFavoriteWeatherData((prevData) => ({
                ...prevData,
                [city]: response.data,
            }));
        } catch (error) {
            console.error('Error fetching weather data for favorite city:', error);
        }
    };

    const removeFavorite = async (city) => {
        try {
            await axios.delete(`http://localhost:5000/favorites/${city}`);
            setFavorites(favorites.filter((fav) => fav !== city)); 
            fetchFavorites(); 
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    useEffect(() => {
        storedFavorites.forEach((city) => {
            fetchWeatherData(city); 
        });
    }, [storedFavorites]);

    const convertTemperature = (kelvin) => {
        if (isCelsius) {
            return (kelvin - 273.15).toFixed(2) + ' °C';
        } else {
            return ((kelvin - 273.15) * 9/5 + 32).toFixed(2) + ' °F'; 
        }
    };

    return (
        <div>
            <h2>Favorite Cities</h2>
            <ul>
                {storedFavorites.map((favorite, index) => (
                    <li key={index}>
                        {favorite}
                        <button onClick={() => removeFavorite(favorite)}>Remove</button>
                        {favoriteWeatherData[favorite] && (
                            <div>
                                <p>Temperature: {convertTemperature(favoriteWeatherData[favorite].main.temp)}</p>
                                <p>Condition: {favoriteWeatherData[favorite].weather[0].description}</p>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            {/* <button onClick={toggleTemperatureUnit}>
                Switch to {isCelsius ? 'Fahrenheit' : 'Celsius'}
            </button> */}
        </div>
    );
};

export default Favorites;
