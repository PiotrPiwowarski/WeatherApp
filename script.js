const input = document.querySelector('input');
const button = document.querySelector('button');
const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');
const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const language = 'pl';
const units = 'metric';
const apiKey = 'f2a429ee2d724de35a14db075ef14342';

async function sendRequest(event) {
  if(event.type === 'click' || event.key === 'Enter' && event.type === 'keydown') {
    const URL = createUrl();
    const response = await axios.get(URL);
    console.log(response);
    getParameters(response);
  }
}

function getParameters(response) {
  const data = response.data;
  setPhoto(data);
  setWeather(data);
  setTemperature(data);
  setHumidity(data);
}

function setHumidity(data) {
  humidity.textContent = `${data.main.humidity}%`;
}

function setWeather(data) {
  weather.textContent = data.weather[0].description;
}

function setTemperature(data) {
  temperature.textContent = `${data.main.temp} st. C`;
}

function setPhoto(data) {
  const weather = data.weather[0].main;
  switch (weather) {
    case 'Clear': {
      photo.setAttribute('src', 'img/Clear.png');
      break;
    }
    case 'Clouds': {
      photo.setAttribute('src', 'img/Clouds.png');
      break;
    }
    case 'Drizzle': {
      photo.setAttribute('src', 'img/Drizzle.png');
      break;
    }
    case 'Fog': {
      photo.setAttribute('src', 'img/Fog.png');
      break;
    }
    case 'Ice': {
      photo.setAttribute('src', 'img/Ice.png');
      break;
    }
    case 'Rain': {
      photo.setAttribute('src', 'img/Rain.png');
      break;
    }
    case 'Thunderstorm': {
      photo.setAttribute('src', 'img/Thunderstorm.png');
      break;
    }
    default: {
      photo.setAttribute('src', 'img/Unknown.png');
      break;
    }
  }
}

function createUrl() {
  const city = input.value;
  return`${URL}?q=${city}&units=${units}&appid=${apiKey}&lang=${language}`;
}

button.addEventListener('click', event => sendRequest(event));
input.addEventListener('keydown', event => sendRequest(event));
