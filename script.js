alert("SCRIPT V2 chargé");
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

`https://api.openweathermap.org/data/2.5/weather?lat=${CONFIG.lat}&lon=${CONFIG.lon}&appid=${CONFIG.apiKey}&units=metric&lang=fr`;

    try {

        const response = await fetch(url);
        const data = await response.json();

        alert(JSON.stringify(data));

        if (data.cod && data.cod != 200) {
            alert("Erreur OpenWeather : " + data.message);
            return;
        }

        document.getElementById("city").textContent = CONFIG.ville;


        document.getElementById("temp").textContent =
            Math.round(data.main.temp) + "°";

        document.getElementById("description").textContent =
            data.weather[0].description;

        document.getElementById("wind").textContent =
            Math.round(data.wind.speed * 3.6) + " km/h";

        document.getElementById("humidity").textContent =
            data.main.humidity + " %";

        document.getElementById("pressure").textContent =
            data.main.pressure + " hPa";

        document.getElementById("feels").textContent =
            Math.round(data.main.feels_like) + "°";

        document.getElementById("icon").src =
            "https://openweathermap.org/img/wn/" +
            data.weather[0].icon +
            "@4x.png";

    } catch (e) {

        console.log(e);

        alert("Impossible de contacter OpenWeather");

    }

}

loadWeather();

setInterval(loadWeather, 600000);
