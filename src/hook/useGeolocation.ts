navigator.geolocation.getCurrentPosition((position) => {
  const { latitude, longitude } = position.coords;
  // Use latitude and longitude to get weather data for the user's location
});
