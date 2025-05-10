function getCustomWeatherIcon(conditionText) {
  const map = {
    "Sunny": "sunny.gif",
    "Partly Cloudy ": "partly_cloudy.gif",
    "Cloudy": "cloudy.gif",
    "Overcast": "overcast.gif",
    "Rain": "rain.gif",
    "Light rain": "rain_light.gif",
    "Thunderstorm": "thunderstorm.gif",
    "Snow": "snow.gif",
    "Mist": "mist.gif",
    "Patchy rain nearby": "patchy_rain.gif"
  };

  return map[conditionText]; // fallback
}


function animateSearch() {
    const searchBar = document.getElementById("searchBar");
    
    // Collapse
    searchBar.classList.add("collapsed");

    // Optional: Perform your search logic here
    const query = document.getElementById("cityInput").value;
    console.log("Searching for:", query);

    // Expand after 1.5s (adjust time as needed)
    setTimeout(() => {
        searchBar.classList.remove("collapsed");
    }, 1500);
}

async function fetchWeather() {
  animateSearch();
  const city = document.getElementById('cityInput').value.trim();
  const apiKey = '70ba5f92dd9b4c73a26130528250905'; // Replace with your actual key

  if (!city) return alert("Please enter a city name");

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&days=3&aqi=no&alerts=no`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const forecastDays = data.forecast.forecastday;

    let html = '';
    forecastDays.forEach(day => {
      const imgSrc = `icons/weather/${getCustomWeatherIcon(day.day.condition.text)}`;
      console.log(imgSrc);
      html += `
        <div class="card weather-card me-3 mb-3" style="width: 18rem;">
          <img src="${imgSrc}" class="mx-auto mb-3 mt-3" style="height: 180px;" alt="${day.day.condition.text}">
          <div class="card-body text-start">
            <h5 class="card-title nunito-sans-text-lg">${day.date}</h5>
            <p class="mb-0 nunito-sans-text-sm">
              <strong>${day.day.condition.text}</strong><br>
              Max: ${day.day.maxtemp_c}°C<br>
              Min: ${day.day.mintemp_c}°C<br>
              Humidity: ${day.day.avghumidity}%<br>
              Wind: ${day.day.maxwind_kph} kph
            </p>
          </div>
        </div>
      `;
    });

    document.getElementById('weatherInfo').innerHTML = `<div class="d-flex flex-wrap">${html}</div>`;

  } catch (error) {
    document.getElementById('weatherInfo').innerHTML = `<p class="text-danger">Failed to fetch weather data.</p>`;
    console.error(error);
  }
}


