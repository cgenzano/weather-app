let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

// display current time and day
let currentday = document.querySelector("#currentday");
currentday.innerHTML = day;
let currentTime = document.querySelector("#time");
currentTime.innerHTML = hours + ":" + minutes;

// change info
function displayTemp(response) {
  console.log(response);
  let temperatureElement = document.querySelector("#temp");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  let wsElement = document.querySelector("#windspeed");
  let winds = Math.round(response.data.wind.speed);
  wsElement.innerHTML = `${winds} mph`;

  let precElement = document.querySelector("#precipitation");
  let finalPrec = Math.round(response.data.main.humidity);
  precElement.innerHTML = `${finalPrec}%`;

  let cforecast = document.querySelector("#forecast");
  let finalForecast = response.data.weather[0].description;
  cforecast.innerHTML = `${finalForecast}`;

  let picElement = document.querySelector("#photo");

  picElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  picElement.setAttribute("alt", response.data.weather[0].description);
}
//conversion functions
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
//change name of city
function changeCity(event) {
  event.preventDefault();
  let cityPlace = document.querySelector("h1");
  let cityValue = document.querySelector("#city-value");
  cityPlace.innerHTML = cityValue.value;
  let city = cityValue.value;
  let apiKey = "dcb6b71d0331f2cd4602b0cedf3d0f48";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(displayTemp);
}
let form = document.querySelector("#city-form");
form.addEventListener("submit", changeCity);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
