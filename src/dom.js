import getWeather from "./fetch";

const search = document.getElementById("search");
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const condition = document.getElementById("condition");
const conditionIcon = document.getElementById("conditionIcon");
const high = document.getElementById("high");
const low = document.getElementById("low");

const updateDom = (data) => {
  console.log(data);
  city.textContent = `${data.location.name}`;
  temp.textContent = `${data.current.temp_f}°`;
  high.textContent = `H: ${data.forecast.forecastday[0].day.maxtemp_f}°`;
  low.textContent = `L: ${data.forecast.forecastday[0].day.mintemp_f}°`;
  conditionIcon.setAttribute("src", `${data.current.condition.icon}`);
  conditionIcon.setAttribute("alt", `${data.current.condition.text}`);
  condition.textContent = `${data.current.condition.text}`;
};

getWeather().then((locationData) => updateDom(locationData));

search.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    getWeather(search.value).then((locationData) => updateDom(locationData));
  }
});
