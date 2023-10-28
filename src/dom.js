import getWeather from "./fetch";

const search = document.getElementById("search");

search.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    getWeather(search.value);
  }
});
