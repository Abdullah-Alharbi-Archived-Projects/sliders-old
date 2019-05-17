const tempElement = document.getElementById('temperature');
const iconElement = document.getElementById('icon');
const weatherStatsElement = document.getElementById('weather-stats');

function weather(city, tempType, apiKey) {
  let currentIcon = '';
  let iconURL = 'https://openweathermap.org/img/w/';
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      const { main, weather, wind } = data;
      const temp = convertTemp(tempType, main.temp);
      tempElement.innerHTML = `الرياض - ${temp}&deg;`;
      
      console.log(weather[0]);
      iconURL += `${weather[0].icon}.png`;
      iconElement.setAttribute('src', iconURL);
      iconElement.innerHTML = weather[0].main;
      weatherStatsElement.innerHTML = `سرعة الرياح: ${wind.speed}\n<br>نسبة الرطوبة: ${main.humidity}%`;
    })
    .catch(err => console.log(err));
}

function convertTemp(tempType, fh) {
  if (tempType.toUpperCase() === 'C') {
    // (32°F − 32) × 5/9 = 0°C
    return (fh - 32) * 5 / 9;
  } else {
    return fh
  }
}
