import { format, isDate } from "date-fns";
import getWeather from "./fetch";

const search = document.getElementById("search");
const city = document.getElementById("city");
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const condition = document.getElementById("condition");
const conditionIcon = document.getElementById("conditionIcon");
const high = document.getElementById("high");
const low = document.getElementById("low");
const airQuality = document.getElementById("airQuality");
const uvIndex = document.getElementById("uvIndex");
const precipitation = document.getElementById("precipitation");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const moonPhase = document.getElementById("moonPhase");
const precipitationExpected = document.getElementById("precipitationExpected");

const updateDom = (data) => {
  console.log(data);
  if (data.location.country === "United States of America") {
    city.textContent = `${data.location.name}, ${data.location.region}`;
  } else {
    city.textContent = `${data.location.name}, ${data.location.country}`;
  }
  const thisDate = new Date(data.location.localtime);
  console.log(thisDate, isDate(thisDate));
  if (isDate(thisDate)) {
    date.textContent = `${format(thisDate, "EEEE MMMM d y | h:mm a")}`;
  }
  temp.textContent = `Actual: ${Math.round(
    data.current.temp_f,
  )}° \u00A0 Feels like: ${Math.round(data.current.feelslike_f)}°`;
  high.textContent = `H: ${Math.round(
    data.forecast.forecastday[0].day.maxtemp_f,
  )}°`;
  low.textContent = `L: ${Math.round(
    data.forecast.forecastday[0].day.mintemp_f,
  )}°`;
  conditionIcon.setAttribute("src", `${data.current.condition.icon}`);
  conditionIcon.setAttribute("alt", `${data.current.condition.text}`);
  condition.textContent = `${data.current.condition.text}`;
  if (data.current.air_quality["us-epa-index"] === 1) {
    airQuality.classList.remove("bg-yellow-500", "bg-orange-500", "bg-red-500");
    airQuality.classList.add("bg-green-500", "rounded-3xl");
  } else if (data.current.air_quality["us-epa-index"] === 2) {
    airQuality.classList.remove("bg-green-500", "bg-orange-500", "bg-red-500");
    airQuality.classList.add("bg-yellow-500", "rounded-3xl");
  } else if (data.current.air_quality["us-epa-index"] === 3) {
    airQuality.classList.remove("bg-green-500", "bg-yellow-500", "bg-red-500");
    airQuality.classList.add("bg-orange-500", "rounded-3xl");
  } else if (data.current.air_quality["us-epa-index"] >= 4) {
    airQuality.classList.remove(
      "bg-green-500",
      "bg-yellow-500",
      "bg-orange-500",
    );
    airQuality.classList.add("bg-red-500", "rounded-3xl");
  }
  airQuality.textContent = `${data.current.air_quality["us-epa-index"]}`;
  if (data.current.uv <= 2) {
    uvIndex.classList.add("bg-green-500", "rounded-3xl");
    uvIndex.classList.remove("bg-yellow-500", "bg-orange-500", "bg-red-500");
  } else if (data.current.uv <= 5) {
    uvIndex.classList.add("bg-yellow-500", "rounded-3xl");
    uvIndex.classList.remove("bg-green-500", "bg-orange-500", "bg-red-500");
  } else if (data.current.uv <= 7) {
    uvIndex.classList.add("bg-orange-500", "rounded-3xl");
    uvIndex.classList.remove("bg-green-500", "bg-yellow-500", "bg-red-500");
  } else if (data.current.uv <= 10) {
    uvIndex.classList.add("bg-red-500", "rounded-3xl");
    uvIndex.classList.remove("bg-green-500", "bg-yellow-500", "bg-orange-500");
  }
  uvIndex.textContent = `${data.current.uv}`;
  precipitation.textContent = `${data.forecast.forecastday[0].day.daily_chance_of_rain}% \u00A0 | \u00A0 ${data.forecast.forecastday[0].day.daily_chance_of_snow}%`;
  wind.textContent = `${data.current.wind_dir} at ${data.current.wind_mph} mph`;
  humidity.textContent = `${data.current.humidity}%`;
  precipitationExpected.textContent = `${data.forecast.forecastday[0].day.totalprecip_in} in`;
  sunrise.textContent = `${data.forecast.forecastday[0].astro.sunrise}`;
  sunset.textContent = `${data.forecast.forecastday[0].astro.sunset}`;
  moonPhase.textContent = `${data.forecast.forecastday[0].astro.moon_phase}`;
};

getWeather().then((locationData) => updateDom(locationData));

search.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    getWeather(search.value)
      .then((locationData) => updateDom(locationData))
      .catch((err) => console.error(err));
  }
});
