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

// change name of city
function displayTemp(response) {
  console.log(response);
  let tempElement = document.querySelector("#temp");
  let finalTemp = Math.round(response.data.main.temp);
  tempElement.innerHTML = `${finalTemp} °F`;

  let wsElement = document.querySelector("#windspeed");
  let winds = Math.round(response.data.wind.speed);
  wsElement.innerHTML = `${winds} mph`;

  let precElement = document.querySelector("#precipitation");
  let finalPrec = Math.round(response.data.main.humidity);
  precElement.innerHTML = `${finalPrec}%`;
}

function changeCity(event) {
  event.preventDefault();
  let cityPlace = document.querySelector("h1");
  let cityValue = document.querySelector("#city-value");
  cityPlace.innerHTML = cityValue.value;
  let city = cityValue.value;
  let apiKey = "dcb6b71d0331f2cd4602b0cedf3d0f48";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(`${apiUrl}`).then(displayTemp);
}
let form = document.querySelector("#city-form");
form.addEventListener("submit", changeCity);
