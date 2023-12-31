const getWeather = async (loc = "Amsterdam") => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=76476d4683bf484d83094151232810&q=${loc}&days=3&aqi=yes`,
  );
  const locationData = await response.json();
  return locationData;
};

export default getWeather;
