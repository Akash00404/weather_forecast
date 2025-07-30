document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('locationForm');
  const result = document.getElementById('weatherResult');
  const spinner = document.getElementById('spinner');
  const locationInput = document.getElementById('locationInput');
  const mainMessage = document.getElementById('mainMessage');


  const openWeatherApiKey = '21f9e07d5603f2234347ea19b2b6ba8c';

  function showMessage(elementId, message, type = "error") {
    const messageElement = document.getElementById(elementId);
    if (messageElement) {
      messageElement.textContent = message;
      messageElement.className = `message ${type}`;
      messageElement.style.display = "block";
      setTimeout(() => {
        messageElement.style.display = "none";
        messageElement.textContent = "";
      }, 3000);
    }
  }

  const storedUser = localStorage.getItem("username");
  if (!storedUser) {
    window.location.href = "login.html";
    return;
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      spinner.style.display = 'block';
      result.innerHTML = '';
      mainMessage.style.display = 'none'; 

      const locationName = locationInput.value.trim();

      if (!locationName) {
        showMessage("mainMessage", "Please enter a city name.", "error");
        spinner.style.display = 'none';
        return;
      }

      try {
        
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${locationName}&units=metric&appid=${openWeatherApiKey}`);

        if (!weatherResponse.ok) {
          const errorData = await weatherResponse.json();
          throw new Error(`Weather API error: ${errorData.message || weatherResponse.statusText}`);
        }
        const weatherData = await weatherResponse.json();
        spinner.style.display = 'none';

        if (!weatherData || !weatherData.list || weatherData.list.length === 0) {
          throw new Error("Invalid weather data received from OpenWeatherMap API.");
        }

        renderOpenWeatherMapForecastResult(weatherData);

      } catch (err) {
        spinner.style.display = 'none';
        showMessage("mainMessage", err.message || "An unexpected error occurred while fetching weather data.", "error");
        result.innerHTML = '';
      }
    });
  }

  function renderOpenWeatherMapForecastResult(data) {
    const cityName = data.city.name;
    const countryCode = data.city.country;
    let html = `<h3 class="location-name">${cityName}, ${countryCode}</h3>`;

    
    const dailyForecasts = {};
    data.list.forEach(forecast => {
      const date = new Date(forecast.dt * 1000);
      const day = date.toISOString().split('T')[0]; 
      if (!dailyForecasts[day]) {
        dailyForecasts[day] = [];
      }
      dailyForecasts[day].push(forecast);
    });

    
    const current = data.list[0];
    html += `<div class="current-weather">`;
    html += `<h4>Current Weather</h4>`;
    html += `<p class="current-temp">${Math.round(current.main.temp)}°C ${getOpenWeatherEmoji(current.weather[0].icon)}</p>`;
    html += `<p>${current.weather[0].description}</p>`;
    html += `<p>Humidity: ${current.main.humidity}%</p>`;
    html += `<p>Wind: ${current.wind.speed} m/s</p>`;
    html += `<p>Feels like: ${Math.round(current.main.feels_like)}°C</p>`;
    html += `</div>`;
    html += '<hr>';

    
    html += `<h4>Today's Hourly Forecast</h4>`;
    html += `<div class="hourly-forecast-grid">`;
    for (let i = 0; i < Math.min(8, data.list.length); i++) {
      const hourData = data.list[i];
      const hourTime = new Date(hourData.dt * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      html += `<div class="hourly-item">`;
      html += `<p>${hourTime}</p>`;
      html += `<p>${Math.round(hourData.main.temp)}°C ${getOpenWeatherEmoji(hourData.weather[0].icon)}</p>`;
      html += `</div>`;
    }
    html += `</div>`;
    html += '<hr>';

    
    html += '<h4>5-Day Forecast</h4>';
    html += `<div class="daily-forecast-list">`;
    let dayCount = 0;
    for (const day in dailyForecasts) {
      if (dayCount >= 5) break; // Limit to 5 days
      const forecastsForDay = dailyForecasts[day];
      const dateObj = new Date(forecastsForDay[0].dt * 1000);
      const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'long' });

      
      let minTemp = Infinity;
      let maxTemp = -Infinity;
      let avgTemp = 0;
      let totalTemp = 0;
      let conditions = new Set();

      forecastsForDay.forEach(f => {
        minTemp = Math.min(minTemp, f.main.temp_min);
        maxTemp = Math.max(maxTemp, f.main.temp_max);
        totalTemp += f.main.temp;
        conditions.add(f.weather[0].description);
      });
      avgTemp = totalTemp / forecastsForDay.length;

     
      const middayForecast = forecastsForDay.find(f => new Date(f.dt * 1000).getHours() >= 12 && new Date(f.dt * 1000).getHours() < 18) || forecastsForDay[0];
      const dailyIcon = getOpenWeatherEmoji(middayForecast.weather[0].icon);


      html += `<div class="daily-item">`;
      html += `<p><b>${weekday} (${formatDate(dateObj)})</b></p>`;
      html += `<p>Avg: ${Math.round(avgTemp)}°C (${Math.round(minTemp)}°C / ${Math.round(maxTemp)}°C)</p>`;
      html += `<p class="condition-text">${Array.from(conditions).join(', ')} ${dailyIcon}</p>`;
      html += `</div>`;
      dayCount++;
    }
    html += `</div>`;

    result.innerHTML = html;
  }


  function getOpenWeatherEmoji(iconCode) {
    
    switch (iconCode) {
      case '01d':
      case '01n':
        return '☀️'; 
      case '02d':
      case '02n':
        return '🌤️'; 
      case '03d':
      case '03n':
        return '☁️'; 
      case '04d':
      case '04n':
        return ' overcast'; 
      case '09d':
      case '09n':
        return '🌧️'; 
      case '10d':
      case '10n':
        return '☔'; 
      case '11d':
      case '11n':
        return '⛈️'; 
      case '13d':
      case '13n':
        return '❄️'; 
      case '50d':
      case '50n':
        return '🌫️'; 
      default:
        return '🌈'; 
    }
  }

  function formatDate(dateObj) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return dateObj.toLocaleDateString('en-US', options);
  }
});