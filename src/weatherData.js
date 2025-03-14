import sunBigIcon from './assets/icons/sun-big.svg';
import moonBigIcon from './assets/icons/moon-big.svg';

import sunSmallIcon from "./assets/icons/sun-small.svg";
import moonSmallIcon from "./assets/icons/moon-small.svg";

export const weatherData = (() => {
    const searchField = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const weatherDataPanel = document.querySelector('.weather-data');
    const errorMessage = document.querySelector('.error-message');

    // Fetching weather data function

    const getWeather = async (location) => {
        try {
            const apiKey = 'APXATEEFMHYTLYK9HZNAQ6XM9';
            const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apiKey}&include=hours,current&contentType=json`;

            weatherDataPanel.classList.add('pending');
            
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();

            console.log('Weather Data', data);

            weatherDataPanel.classList.remove('pending');

            updateHeaderWeather(data);
            updateHourlyForecast(data);
            updateDailyForecast(data);
            updateWindInfo(data);
            updateSunInfo(data);
            updatePressureInfo(data);
        } catch (error) {
            console.log('Failed to fetch weather data: ', error);
            weatherDataPanel.classList.remove('pending');
            showError();
        }
    };



    // Secondary functions

    const updateHeaderWeather = (data) => {
        const locationName = document.querySelector('.location-name');
        const temperatureValue = document.querySelector('#temperature');
        const timeOfDayIcon = document.querySelector('#time-of-day-icon');
        const timeOfDay = document.querySelector('#time-of-day-value');
        
        const highestTempHeader = document.querySelector('.temperatures-range > .highest > .value');
        const lowestTempHeader = document.querySelector('.temperatures-range > .lowest > .value');
        
        const today = data.days[0];
                
        const currentTime = data.currentConditions.datetime;
        const sunrise = today.sunrise;
        const sunset = today.sunset;

        locationName.textContent = `${data.resolvedAddress}`;
        temperatureValue.textContent = `${Math.round(today.temp)}°`;

        const isDaytime = currentTime >= sunrise && currentTime <= sunset;

        if (isDaytime) {
            timeOfDay.textContent = 'Day';
            timeOfDayIcon.src = sunBigIcon;
        } else {
            timeOfDay.textContent = 'Night';
            timeOfDayIcon.src = moonBigIcon;
        }

        highestTempHeader.textContent = today.tempmax;
        lowestTempHeader.textContent = today.tempmin;
    }

    const updateHourlyForecast = (data) => {
        const nextHoursHtml = document.querySelectorAll('.next-hours-forecast .hour');
        
        const today = data.days[0];
        const currentTime = data.currentConditions.datetime;
        const sunrise = today.sunrise;
        const sunset = today.sunset;

        const allHours = today.hours; // Get the hour
        const [hours, minutes, seconds] = currentTime.split(':');
        const currentHour = `${hours}:00:00`;
        const currentHourIndex = allHours.findIndex((hour) => hour.datetime === currentHour);
        const nextHours = allHours.slice(currentHourIndex, currentHourIndex + 7);

        nextHours.forEach((hour, index) => {
            const time = allHours.indexOf(hour).toString(); // Get hour
            const temp = Math.round(hour.temp); // Get temperature

            if (nextHoursHtml[index]) {
                nextHoursHtml[index].querySelector('.value').textContent = index === 0 ? 'Now' : time;
                nextHoursHtml[index].querySelector('.hour-temperature').textContent = `${temp}°`;

                const isDaytime = time >= sunrise && time <= sunset;

                if (isDaytime) {
                    nextHoursHtml[index].querySelector('img').src = sunSmallIcon;
                } else {
                    nextHoursHtml[index].querySelector('img').src = moonSmallIcon;
                }
            }
        });
    }

    const updateDailyForecast = (data) => {
        const days = document.querySelectorAll('.temperature');

        const sevenDays = data.days.slice(0, 7);

        sevenDays.forEach((day, index) => {
            const date = new Date(day.datetime);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
            const dayForecast = day.conditions;
            const lowestTemp = day.tempmin;
            const highestTemp = day.tempmax;

            days[index].querySelector('.day').textContent = dayName;
            days[index].querySelector('.day-forecast').textContent = dayForecast;
            days[index].querySelector('.lowest').textContent = `${Math.round(lowestTemp)}°`;
            days[index].querySelector('.highest').textContent = `${Math.round(highestTemp)}°`;
        });
    }

    const updateWindInfo = (data) => {
        const windspeedHtml = document.querySelector('.wind-info .wind-speed .value');
        const winddirHrml = document.querySelector('.wind-info .additional-info .dir-value');
        
        const windspeed = data.currentConditions.windspeed;
        const winddir = data.currentConditions.winddir;

        windspeedHtml.textContent = windspeed;
        winddirHrml.textContent = getWindDirection(winddir);

        function getWindDirection(degrees) {
            const directions = ["North", "Northeast", "Eeast", "Southeast", "South", "Southwest", "West", "Northwest"];
            const index = Math.round(degrees / 45) % 8; // 360° / 8 = 45° per direction
            return directions[index];
        }
    }

    const updateSunInfo = (data) => {
        const sunsetTime = data.currentConditions.sunset;
        const sunriseTime = data.currentConditions.sunrise;

        const [sunsetHours, sunsetMinutes, sunsetSeconds] = sunsetTime.split(':');
        const [sunriseHours, sunriseMinutes, sunriseSeconds] = sunriseTime.split(':');

        const sunsetTimeHtml = document.querySelector('.sunset-info .sunset-value');
        const sunriseTimeHtml = document.querySelector('.sunset-info .sunrise-value');

        sunsetTimeHtml.textContent = `${sunsetHours}:${sunsetMinutes}`;
        sunriseTimeHtml.textContent = `${sunriseHours}:${sunriseMinutes}`;
    }

    const updatePressureInfo = (data) => {
        const pressure = data.currentConditions.pressure.toString();
        const humidity = data.currentConditions.humidity.toString();

        const pressureHtml = document.querySelector('.pressure-value .value');
        const humidityHtml = document.querySelector('.pressure-info .additional-info .hum-value');

        pressureHtml.textContent = pressure;
        humidityHtml.textContent = humidity;
    }

    const searchWeather = () => {
        const location = searchField.value.trim();
        if (location) { getWeather(location) }
    }

    const showError = () => {
        errorMessage.classList.add('show');

        // Remove the message after 3 seconds
        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 3000);
    }







    // Event listeners

    // searchField.addEventListener('keypress', (e) => {
    //     if (e.key === 'Enter') { searchWeather() }
    // });

    // searchBtn.addEventListener('click', () => { searchWeather() });

    return { searchWeather }
})();