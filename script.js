const apiKey = "10f3c584c1d583308348a78236399af7"; // Replace with your OpenWeatherMap API key

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherCard = document.getElementById("weatherCard");

async function getWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();

    document.getElementById("cityName").innerText = `${data.name}, ${data.sys.country}`;
    document.getElementById("date").innerText = new Date().toLocaleDateString();
    document.getElementById("temperature").innerText = `${Math.round(data.main.temp)}°C`;
    document.getElementById("description").innerText = data.weather[0].description;
    document.getElementById("humidity").innerText = data.main.humidity;
    document.getElementById("wind").innerText = (data.wind.speed * 3.6).toFixed(1); // m/s → km/h
    document.getElementById("weatherIcon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherCard.classList.remove("hidden");
  } catch (error) {
    alert(error.message);
  }
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city !== "") {
    getWeather(city);
  }
});

// Optional: Auto-detect location
window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(res => res.json())
        .then(data => {
          document.getElementById("cityName").innerText = `${data.name}, ${data.sys.country}`;
          document.getElementById("date").innerText = new Date().toLocaleDateString();
          document.getElementById("temperature").innerText = `${Math.round(data.main.temp)}°C`;
          document.getElementById("description").innerText = data.weather[0].description;
          document.getElementById("humidity").innerText = data.main.humidity;
          document.getElementById("wind").innerText = (data.wind.speed * 3.6).toFixed(1);
          document.getElementById("weatherIcon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
          weatherCard.classList.remove("hidden");
        });
    });
  }
});
