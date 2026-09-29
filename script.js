// ================================
// OPENWEATHER API KEY
// ================================

const API_KEY = "c398f156267a789b03b4ac54252d0f13";


// ================================
// GET WEATHER
// ================================

async function getWeather() {

    // Get city name from input
    const city = document.getElementById("cityInput").value.trim();

    // Get error element
    const errorMessage = document.getElementById("errorMessage");


    // Check if city is empty
    if (city === "") {

        errorMessage.textContent =
            "Please enter a city name.";

        return;
    }


    // Clear previous error
    errorMessage.textContent = "";


    try {

        // ==================================
        // STEP 1: GET CITY COORDINATES
        // ==================================

        const geoURL =
            `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`;


        const geoResponse = await fetch(geoURL);


        if (!geoResponse.ok) {
            throw new Error("Unable to find city.");
        }


        const geoData = await geoResponse.json();


        // Check whether city was found
        if (geoData.length === 0) {

            throw new Error(
                "City not found. Please check the city name."
            );
        }


        // Get latitude and longitude
        const latitude = geoData[0].lat;
        const longitude = geoData[0].lon;


        // ==================================
        // STEP 2: GET CURRENT WEATHER
        // ==================================

        const weatherURL =
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;


        const weatherResponse =
            await fetch(weatherURL);


        if (!weatherResponse.ok) {
            throw new Error("Unable to get weather data.");
        }


        const weatherData =
            await weatherResponse.json();


        // ==================================
        // STEP 3: DISPLAY WEATHER
        // ==================================

        displayWeather(weatherData);

    }


    catch (error) {

        errorMessage.textContent =
            error.message;

    }
}


// ================================
// DISPLAY WEATHER
// ================================

function displayWeather(data) {

    // City name
    document.getElementById("cityName").textContent =
        `${data.name}, ${data.sys.country}`;


    // Temperature
    document.getElementById("temperature").textContent =
        `${Math.round(data.main.temp)}°C`;


    // Weather condition
    document.getElementById("condition").textContent =
        data.weather[0].description;


    // Humidity
    document.getElementById("humidity").textContent =
        `${data.main.humidity}%`;


    // Feels like
    document.getElementById("feelsLike").textContent =
        `${Math.round(data.main.feels_like)}°C`;


    // Weather icon
    const iconCode =
        data.weather[0].icon;


    document.getElementById("weatherIcon").src =
        `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}