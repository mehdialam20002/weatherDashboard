import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchCity = ({ setWeatherData, setForecastData, favorites, setFavorites }) => {
    const [city, setCity] = useState('');

    // Load last searched city from localStorage when the component mounts
    useEffect(() => {
        const lastSearchedCity = localStorage.getItem('lastSearchedCity');
        if (lastSearchedCity) {
            setCity(lastSearchedCity);
            searchWeather(lastSearchedCity);
        }
 }, []);

    const searchWeather = async (searchCity = city) => {
        if (!searchCity) {
            alert("Please enter a city name.");
            return;
        }

        const apiKey = '0be9ef9ff42870349b91e59e55303e56'; 
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}`
            );
            setWeatherData(response.data);
            localStorage.setItem('lastSearchedCity', searchCity);
            fetchForecast(response.data.coord);

        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const fetchForecast = async (coords) => {
        const apiKey = '0be9ef9ff42870349b91e59e55303e56'; 
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`
            );
            setForecastData(response.data.list);
        } catch (error) {
            console.error('Error fetching forecast data:', error);
        }
    };

    const addFavorite = async () => {
        if (!city) {
            alert("Please enter a city name.");
            return;
        }

        if (favorites.includes(city)) {
            alert("City is already in favorites");
            return;
        }

        const newFavorite = { city };
        try {
            const response = await axios.post('http://localhost:5000/favorites', newFavorite);
            setFavorites((prevFavorites) => [...prevFavorites, city]);
            setCity(''); 
            alert(response.data.message);
        } catch (error) {
            console.error('Error adding favorite', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
            />
            <button onClick={() => searchWeather(city)}>Search</button>
            <button onClick={addFavorite}>Add to Favorites</button>
        </div>
    );
};

export default SearchCity;
