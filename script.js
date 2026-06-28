// ===== MétéoiPad V1 =====

const time = document.getElementById("time");
const date = document.getElementById("date");

function updateClock() {
    const now = new Date();

    time.textContent = now.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit"
    });

    date.textContent = now.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long"
    });
}

updateClock();
setInterval(updateClock, 1000);

async function loadWeather() {

    const url =
`https://api.openweathermap.org/data/2.5/weather?lat=${CONFIG.lat}&lon=${CONFIG.lon}&units=${CONFIG.units}&lang=${CONFIG.lang}&appid=${CONFIG.apiKey}`;

    const response = await fetch(url);
    const weather = await response.json();

    document.getElementById("city").textContent = CONFIG.ville;

    document.getElementById("temp").textContent =
        Math.round(weather.main.temp) + "°";

    document.getElementById("description").textContent =
        weather.weather[0].description;

    document.getElementById("wind").textContent =
        Math.round(weather.wind.speed * 3.6) + " km/h";

    document.getElementById("humidity").textContent =
        weather.main.humidity + " %";

    document.getElementById("pressure").textContent =
        weather.main.pressure + " hPa";

    document.getElementById("feels").textContent =
        Math.round(weather.main.feels_like) + "°";

    document.getElementById("icon").src =
        `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;

}

loadWeather();
setInterval(loadWeather, 600000);
