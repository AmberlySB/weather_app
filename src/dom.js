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
const dayOne = document.getElementById("dayOne");
const dayOneHigh = document.getElementById("dayOneHigh");
const dayOneLow = document.getElementById("dayOneLow");
const dayOneIcon = document.getElementById("dayOneIcon");
const dayOneCondition = document.getElementById("dayOneCondition");
const dayTwo = document.getElementById("dayTwo");
const dayTwoHigh = document.getElementById("dayTwoHigh");
const dayTwoLow = document.getElementById("dayTwoLow");
const dayTwoIcon = document.getElementById("dayTwoIcon");
const dayTwoCondition = document.getElementById("dayTwoCondition");
const degreeBtn = document.getElementById("degreeBtn");

let degreeType = "fahrenheit";

const updateDom = (data) => {
  // Todays Weather

  if (data.location.country === "United States of America") {
    city.textContent = `${data.location.name}, ${data.location.region}`;
  } else {
    city.textContent = `${data.location.name}, ${data.location.country}`;
  }
  const thisDate = new Date(data.location.localtime.replace(/-/g, "/"));
  if (isDate(thisDate)) {
    date.textContent = `${format(thisDate, "EEEE MMMM d y | h:mm a")}`;
  }
  if (degreeType === "fahrenheit") {
    temp.textContent = `Actual: ${Math.round(
      data.current.temp_f,
    )}° \u00A0 Feels like: ${Math.round(data.current.feelslike_f)}°`;
    high.textContent = `H: ${Math.round(
      data.forecast.forecastday[0].day.maxtemp_f,
    )}°`;
    low.textContent = `L: ${Math.round(
      data.forecast.forecastday[0].day.mintemp_f,
    )}°`;
  } else {
    temp.textContent = `Actual: ${Math.round(
      data.current.temp_c,
    )}° \u00A0 Feels like: ${Math.round(data.current.feelslike_c)}°`;
    high.textContent = `H: ${Math.round(
      data.forecast.forecastday[0].day.maxtemp_c,
    )}°`;
    low.textContent = `L: ${Math.round(
      data.forecast.forecastday[0].day.mintemp_c,
    )}°`;
  }
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
  if (degreeType === "fahrenheit") {
    wind.textContent = `${data.current.wind_dir} at ${data.current.wind_mph} mph`;
  } else {
    wind.textContent = `${data.current.wind_dir} at ${data.current.wind_kph} kph`;
  }
  humidity.textContent = `${data.current.humidity}%`;
  if (degreeType === "fahrenheit") {
    precipitationExpected.textContent = `${data.forecast.forecastday[0].day.totalprecip_in} in`;
  } else {
    precipitationExpected.textContent = `${data.forecast.forecastday[0].day.totalprecip_mm} mm`;
  }
  sunrise.textContent = `${data.forecast.forecastday[0].astro.sunrise}`;
  sunset.textContent = `${data.forecast.forecastday[0].astro.sunset}`;
  moonPhase.textContent = `${data.forecast.forecastday[0].astro.moon_phase}`;

  // future forecast

  const weekDayOne = new Date(
    data.forecast.forecastday[1].date.replace(/-/g, "/"),
  );
  const weekDayTwo = new Date(
    data.forecast.forecastday[2].date.replace(/-/g, "/"),
  );

  // Day one

  dayOne.textContent = `${format(weekDayOne, "EEEE")}`;
  if (degreeType === "fahrenheit") {
    dayOneHigh.textContent = `H: ${Math.round(
      data.forecast.forecastday[1].day.maxtemp_f,
    )}°`;
    dayOneLow.textContent = `L: ${Math.round(
      data.forecast.forecastday[1].day.mintemp_f,
    )}°`;
  } else {
    dayOneHigh.textContent = `H: ${Math.round(
      data.forecast.forecastday[1].day.maxtemp_c,
    )}°`;
    dayOneLow.textContent = `L: ${Math.round(
      data.forecast.forecastday[1].day.mintemp_c,
    )}°`;
  }
  dayOneIcon.setAttribute(
    "src",
    data.forecast.forecastday[1].day.condition.icon,
  );
  dayOneIcon.setAttribute(
    "alt",
    data.forecast.forecastday[1].day.condition.text,
  );
  dayOneCondition.textContent = data.forecast.forecastday[1].day.condition.text;

  // Day two

  dayTwo.textContent = `${format(weekDayTwo, "EEEE")}`;
  if (degreeType === "fahrenheit") {
    dayTwoHigh.textContent = `H: ${Math.round(
      data.forecast.forecastday[2].day.maxtemp_f,
    )}°`;
    dayTwoLow.textContent = `L: ${Math.round(
      data.forecast.forecastday[2].day.mintemp_f,
    )}°`;
  } else {
    dayTwoHigh.textContent = `H: ${Math.round(
      data.forecast.forecastday[2].day.maxtemp_c,
    )}°`;
    dayTwoLow.textContent = `L: ${Math.round(
      data.forecast.forecastday[2].day.mintemp_c,
    )}°`;
  }
  dayTwoIcon.setAttribute(
    "src",
    data.forecast.forecastday[2].day.condition.icon,
  );
  dayTwoIcon.setAttribute(
    "alt",
    data.forecast.forecastday[2].day.condition.text,
  );
  dayTwoCondition.textContent = data.forecast.forecastday[2].day.condition.text;
};

const setDegreeType = () => {
  if (degreeType === "fahrenheit") {
    degreeType = "celcius";
    degreeBtn.textContent = "°F";
  } else {
    degreeType = "fahrenheit";
    degreeBtn.textContent = "°C";
  }

  if (search.value !== "") {
    getWeather(search.value)
      .then((locationData) => updateDom(locationData))
      .catch((err) => console.error(err));
  } else {
    getWeather()
      .then((locationData) => updateDom(locationData))
      .catch((err) => console.error(err));
  }
};

degreeBtn.addEventListener("click", setDegreeType);

getWeather()
  .then((locationData) => updateDom(locationData))
  .catch((err) => console.error(err));

search.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    getWeather(search.value)
      .then((locationData) => updateDom(locationData))
      .catch((err) => console.error(err));
  }
});
