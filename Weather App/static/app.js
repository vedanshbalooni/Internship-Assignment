async function getWeather() {
    var cityInput = document.getElementById("cityInput");
    var weatherInfoDiv = document.getElementById("weatherInfo");

    if (cityInput.value.trim() !== "") {
        var response = await fetch('/get_weather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'city=' + encodeURIComponent(cityInput.value),
        });

        if (response.ok) {
            var data = await response.json();
            displayWeatherInfo(weatherInfoDiv, data);
        } else {
            weatherInfoDiv.innerHTML = '<p>Error fetching weather information</p>';
        }
    }
}

function displayWeatherInfo(container, data) {
    container.innerHTML = `
        <h2>${data.city}</h2>
        <p>Temperature: ${data.temperature} K</p>
        <p>Description: ${data.description}</p>
        <img id="weatherIcon" src="http://openweathermap.org/img/wn/${data.icon}.png" alt="Weather Icon">
    `;
}
