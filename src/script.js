const input = document.querySelector('input');
const button = document.querySelector('button');
const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');
const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');

const LANGUAGE = 'pl';
const UNITS = 'metric';
const CITY_URL = 'http://api.openweathermap.org/geo/1.0/direct';
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'f2a429ee2d724de35a14db075ef14342';
let lat;
let lon;

async function sendRequest(event) {
  clearWarning();
  if(event.type === 'click' || event.key === 'Enter' && event.type === 'keydown') {
    try {
      await getGeographicalCoordinates(input.value);
      const url = `${WEATHER_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${UNITS}&lang=${LANGUAGE}`;
      const response = await axios.get(url);
      getParameters(response);
      clearInput();
    } catch(e) {
      setWarning(e);
      clearInput();
    }
  }
}

async function getGeographicalCoordinates(city) {
  const url = `${CITY_URL}?q=${city}&appid=${API_KEY}`;
  const response = await axios.get(url);
  lat = response.data[0].lat;
  lon = response.data[0].lon;
}

function getParameters(response) {
  const data = response.data;
  setCityName(data);
  setPhoto(data);
  setWeather(data);
  setTemperature(data);
  setHumidity(data);
}

function clearInput() {
  input.value = '';
}

function clearWarning() {
  warning.textContent = '';
}

function setWarning(e) {
  warning.textContent = `Wpisz poprawną nazwę miasta`;
}

function setCityName() {
  cityName.textContent = input.value;
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
      photo.setAttribute('src', '../img/Clear.png');
      break;
    }
    case 'Clouds': {
      photo.setAttribute('src', '../img/Clouds.png');
      break;
    }
    case 'Drizzle': {
      photo.setAttribute('src', '../img/Drizzle.png');
      break;
    }
    case 'Fog': {
      photo.setAttribute('src', '../img/Fog.png');
      break;
    }
    case 'Ice': {
      photo.setAttribute('src', '../img/Ice.png');
      break;
    }
    case 'Rain': {
      photo.setAttribute('src', '../img/Rain.png');
      break;
    }
    case 'Thunderstorm': {
      photo.setAttribute('src', '../img/Thunderstorm.png');
      break;
    }
    default: {
      photo.setAttribute('src', '../img/Unknown.png');
      break;
    }
  }
}

button.addEventListener('click', event => sendRequest(event));
input.addEventListener('keydown', event => sendRequest(event));
