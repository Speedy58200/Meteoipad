// ===== MétéoiPad V2 =====

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

    const url =
        `https://api.openweathermap.org/data/2.5/weather?lat=${CONFIG.lat}&lon=${CONFIG.lon}&appid=${CONFIG.apiKey}&units=${CONFIG.units}&lang=${CONFIG.lang}`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Erreur HTTP " + response.status);
        }

        const data = await response.json();

        document.getElementById("city").textContent = CONFIG.ville;
        document.getElementById("temp").textContent = Math.round(data.main.temp) + "°";
        document.getElementById("description").textContent = data.weather[0].description;
        document.getElementById("wind").textContent = Math.round(data.wind.speed * 3.6) + " km/h";
        document.getElementById("humidity").textContent = data.main.humidity + " %";
        document.getElementById("pressure").textContent = data.main.pressure + " hPa";
        document.getElementById("feels").textContent = Math.round(data.main.feels_like) + "°";

        document.getElementById("icon").src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

    } catch (e) {
        alert(e.message);
        console.error(e);
    }
}

loadWeather();
setInterval(loadWeather, 600000);
