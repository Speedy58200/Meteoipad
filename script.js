// ===============================
// MétéoiPad V3
// Partie 1
// ===============================

function updateClock() {
    const now = new Date();

    document.getElementById("time").textContent =
        now.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit"
        });

    document.getElementById("date").textContent =
        now.toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long"
        });
}

updateClock();
setInterval(updateClock, 1000);

async function loadWeather() {

    try {

        // météo actuelle
        const weatherURL =
            `https://api.openweathermap.org/data/2.5/weather?lat=${CONFIG.lat}&lon=${CONFIG.lon}&units=${CONFIG.units}&lang=${CONFIG.lang}&appid=${CONFIG.apiKey}`;

        // prévisions
        const forecastURL =
            `https://api.openweathermap.org/data/2.5/forecast?lat=${CONFIG.lat}&lon=${CONFIG.lon}&units=${CONFIG.units}&lang=${CONFIG.lang}&appid=${CONFIG.apiKey}`;

        const weatherResponse = await fetch(weatherURL);
        const weather = await weatherResponse.json();
        const condition = weather.weather[0].main.toLowerCase();

document.body.className = "";

switch (condition) {
    case "clear":
        document.body.classList.add("sunny");
        break;

    case "clouds":
        document.body.classList.add("clouds");
        break;

    case "rain":
    case "drizzle":
        document.body.classList.add("rain");
        break;

    case "thunderstorm":
        document.body.classList.add("storm");
        break;

    case "snow":
        document.body.classList.add("snow");
        break;

    default:
        document.body.classList.add("night");
}

        const forecastResponse = await fetch(forecastURL);
        const forecast = await forecastResponse.json();

        if (weather.cod != 200) {
            throw new Error(weather.message);
        }

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

                // ==========================
        // Prévisions 24 heures
        // ==========================

        const hourly = document.getElementById("hourlyForecast");
        hourly.innerHTML = "";

        forecast.list.slice(0, 8).forEach(item => {

            const heure = new Date(item.dt * 1000)
                .toLocaleTimeString("fr-FR", {
                    hour: "2-digit"
                });

            hourly.innerHTML += `
                <div class="hour">
                    <div>${heure}h</div>
                    <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png">
                    <div>${Math.round(item.main.temp)}°</div>
                </div>
            `;
        });

        // ==========================
        // Prévisions 7 jours
        // ==========================

        const daily = document.getElementById("dailyForecast");
        daily.innerHTML = "";

        const jours = {};

        forecast.list.forEach(item => {

            const date = item.dt_txt.split(" ")[0];

            if (!jours[date]) {
                jours[date] = item;
            }

        });

        Object.values(jours)
            .slice(0, 7)
            .forEach(item => {

                const jour =
                    new Date(item.dt * 1000)
                    .toLocaleDateString("fr-FR", {
                        weekday: "long"
                    });

                daily.innerHTML += `
                    <div class="day">
                        <span>${jour}</span>

                        <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png">

                        <span>${Math.round(item.main.temp_min)}° / ${Math.round(item.main.temp_max)}°</span>
                    </div>
                `;
            });

            } catch (error) {

        console.error(error);

        document.getElementById("description").textContent =
            "Impossible de charger la météo";

    }

}

// ===============================
// Démarrage
// ===============================

loadWeather();

// Actualisation toutes les 10 minutes
setInterval(loadWeather, 600000);
