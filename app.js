function getWeatherIcon(condition) {
  const lower = condition.toLowerCase();
  if (lower.includes('sun') || lower.includes('clear')) return '☀️';
  if (lower.includes('cloud')) return '☁️';
  if (lower.includes('rain')) return '🌧️';
  if (lower.includes('snow')) return '❄️';
  if (lower.includes('storm') || lower.includes('thunder')) return '⛈️';
  if (lower.includes('fog') || lower.includes('mist')) return '🌫️';
  return '🌡️';
}

async function getWeather() {
  const city = document.getElementById('city').value.trim();
  const result = document.getElementById('result');

  if (!city) {
    result.innerHTML = '<p>Please enter a city name.</p>';
    return;
  }

  result.innerHTML = '<p>Loading...</p>';

  try {
    const apiKey = 'bae80fb6df0c0a13c4b4f265dfa7102a';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      const icon = getWeatherIcon(data.weather[0].main);
      result.innerHTML = `
        <div class="weather-icon">${icon}</div>
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Condition:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      `;
    } else {
      result.innerHTML = `<p>🌍 City not found. Try another city.</p>`;
    }
  } catch (error) {
    result.innerHTML = `<p>❌ Failed to retrieve weather data. Please try again later.</p>`;
    console.error(error);
  }
}
