//celsiusToFahrenheit
function celsiusToFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#currentTemperature");
  let actualTemperature = temperature.innerHTML;
  temperature.innerHTML = Math.round((actualTemperature * 9) / 5 + 32);
}
let fahrenheit = document.querySelector("#fahrenheitLink");
fahrenheit.addEventListener("click", celsiusToFahrenheit);

//fahrenheitToCelsius
function fahrenheitToCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#currentTemperature");
  let actualTemperature = temperature.innerHTML;
  temperature.innerHTML = (Math.round(actualTemperature - 32) * 5) / 9;
}

let celsius = document.querySelector("#celsiusLnk");
celsius.addEventListener("click", fahrenheitToCelsius);

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

function showUserTemperature(response) {
  let description = response.data.weather[0].description;
  let temperature = Math.round(response.data.main.temp);
  let tempFeelsLike = Math.round(response.data.main.feels_like);
  let wind = Math.round(response.data.wind.speed);
  let humidity = response.data.main.humidity;
  let currentDescription = document.querySelector("h4");
  let currentTemperature = document.querySelector("#currentTemperature");
  let currentTempFeelsLike = document.querySelector("#currentTempFeelsLike");
  let currentWind = document.querySelector("#currentWind");
  let currentHumidity = document.querySelector("#currentHumidity");
  currentDescription.innerHTML = `${description}`;
  currentTemperature.innerHTML = `${temperature}`;
  currentTempFeelsLike.innerHTML = `${tempFeelsLike}`;
  currentWind.innerHTML = `${wind}`;
  currentHumidity.innerHTML = `${humidity}`;
}

function userTemp(event) {
  event.preventDefault();
  let city = document.querySelector("#inputCity").value;
  let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showUserTemperature);
}

let tempForm = document.querySelector("form");
tempForm.addEventListener("submit", userTemp);

//useUserLocation
function showTemperature(response) {
  let city = response.data.name;
  let description = response.data.weather[0].description;
  let temperature = Math.round(response.data.main.temp);
  let tempFeelsLike = Math.round(response.data.main.feels_like);
  let wind = Math.round(response.data.wind.speed);
  let humidity = response.data.main.humidity;
  //let uvIndex = response.data.main.humidity;
  let currentCity = document.querySelector("#currentCity");
  let currentDescription = document.querySelector("h4");
  let currentTemperature = document.querySelector("#currentTemperature");
  let currentTempFeelsLike = document.querySelector("#currentTempFeelsLike");
  let currentWind = document.querySelector("#currentWind");
  let currentHumidity = document.querySelector("#currentHumidity");
  //let currentUVIndex = document.querySelector("#currentCity");
  currentCity.innerHTML = `${city}`;
  currentDescription.innerHTML = `${description}`;
  currentTemperature.innerHTML = `${temperature}`;
  currentTempFeelsLike.innerHTML = `${tempFeelsLike}`;
  currentWind.innerHTML = `${wind}`;
  currentHumidity.innerHTML = `${humidity}`;
  //currentUVIndex.innerHTML = `${uvIndex}`;
  console.log(response.data.weather[0].description);
}

function location(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(location);
}

let locationButton = document.querySelector("#locationButton");
locationButton.addEventListener("click", getCurrentPosition);
