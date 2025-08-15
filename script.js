const apiKey = '017402969a114d38801202048251308'; 


const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityNameEl = document.getElementById('city-name');
const localTimeEl = document.getElementById('local-time');
const weatherIconEl = document.getElementById('weather-icon');
const temperatureEl = document.getElementById('temperature');
const conditionEl = document.getElementById('condition');
const feelslikeEl = document.getElementById('feels-like');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('wind-speed');
const pressureEl = document.getElementById('pressure');
const visibilityEl = document.getElementById('visibility');
const uvIndexEl = document.getElementById('uv-index');
const resultDiv = document.getElementById('weather-result');
const errorDiv = document.getElementById('error-message');


async function fetchWeatherData(city) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no&lang=pt`;

  try {
    const response = await fetch(url);
    
    
    if (!response.ok) {
      throw new Error('Erro ao buscar dados da cidade.');
    }

    const data = await response.json();

    
    if (data.error) {
      showError('Cidade não encontrada. Tente novamente.');
      return;
    }

    displayWeatherData(data);
  } catch (error) {
    showError('Erro ao buscar os dados do clima. Tente novamente.');
    console.error(error);
  }
}

function displayWeatherData(data) {
  cityNameEl.innerText = `${data.location.name} - ${data.location.country}`;
  localTimeEl.innerText = data.location.localtime;
  weatherIconEl.src = data.current.condition.icon;
  weatherIconEl.alt = data.current.condition.text;
  temperatureEl.innerText = `${data.current.temp_c}°C`;
  conditionEl.innerText = data.current.condition.text;
  feelslikeEl.innerText = `${data.current.feelslike_c}°C`;
  humidityEl.innerText = `${data.current.humidity}%`;
  windSpeedEl.innerText = `${data.current.wind_kph} km/h`;
  pressureEl.innerText = `${data.current.pressure_mb} hPa`;
  visibilityEl.innerText = `${data.current.vis_km} km`;
  uvIndexEl.innerText = data.current.uv;


  resultDiv.classList.remove('hidden');
  errorDiv.classList.add('hidden');
}

function showError(message) {
  errorDiv.querySelector('p').innerText = message;
  errorDiv.classList.remove('hidden');
  resultDiv.classList.add('hidden');
}

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city === '') {
    showError('Digite o nome de uma cidade.');
    return;
  }
  fetchWeatherData(city);
});

cityInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    searchBtn.click();
  }
});

fetchWeatherData('Arapiraca');
