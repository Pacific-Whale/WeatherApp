//actualDate
function formatDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Sunday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let date = now.getDate();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let month = months[now.getMonth()];
  let day = days[now.getDay()];
  return `${day}, ${date} ${month} ${hours}:${minutes}`;
}

let currentDate = document.querySelector("#currentDate");
let now = new Date();
currentDate.innerHTML = formatDate(now);

//showUserCity
function showUserCity(event) {
  event.preventDefault();
  let userCity = document.querySelector("#inputCity");
  let webCity = document.querySelector("#currentCity");
  webCity.innerHTML = `${userCity.value}`;
}

let form = document.querySelector("form");
form.addEventListener("submit", showUserCity);

//useUserLocation
function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;

  let city = response.data.name;
  let description = response.data.weather[0].description;
  let temperature = Math.round(celsiusTemperature);
  let wind = Math.round(response.data.wind.speed);
  let humidity = response.data.main.humidity;

  let currentCity = document.querySelector("#currentCity");
  let currentDescription = document.querySelector("h4");
  let currentTemperature = document.querySelector("#currentTemperature");
  let currentWind = document.querySelector("#currentWind");
  let currentHumidity = document.querySelector("#currentHumidity");
  let weatherIcon = document.querySelector("#weatherIcon");

  currentCity.innerHTML = `${city}`;
  currentDescription.innerHTML = `${description}`;
  currentTemperature.innerHTML = `${temperature}`;
  currentWind.innerHTML = `${wind}`;
  currentHumidity.innerHTML = `${humidity}`;
  console.log(response.data.weather[0].icon);
  weatherIcon.setAttribute("alt", response.data.weather[0].main);
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );

  getForecast(response.data.coord);
}

function userTemp(event) {
  event.preventDefault();
  let city = document.querySelector("#inputCity").value;
  let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let tempForm = document.querySelector("form");
tempForm.addEventListener("submit", userTemp);

function userLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(userLocation);
}

let locationButton = document.querySelector("#locationButton");
locationButton.addEventListener("click", getCurrentPosition);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2 forecastDesign">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          class="forecastImage" alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
