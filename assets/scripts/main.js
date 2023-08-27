const getLocation = async (cityPlusState) => {
    const req = `${endpointRoot}/geo/1.0/direct?q=${cityPlusState.city},${cityPlusState.state}&limit=&appid=${weatherAPIKey}`;
    const res = await fetch(req);
    const geoData = await res.json();

    if (history.some(obj => obj.city === cityPlusState.city)
        && history.some(obj => obj.state === cityPlusState.state)
        && newSearch === true) {
        newSearch = false;
        let message = "Already in history!";
        showStatus(message);
        setTimeout(hideStatus(), 1500);
    } else {
        if (geoData[0] === undefined) {
            let message = "Something went wrong!";
            alert(message);
            showStatus(message);
            setTimeout(hideStatus(), 1500);
        } else {
            let message = "Loading...";
            showStatus(message);
            if (res.status === 200 && newSearch === true) {
                history.push(cityPlusState);
                saveData();
                getWeather(geoData[0]);
                getForecast(geoData[0]);
            } else if (res.status === 200 && newSearch === false) {
                getWeather(geoData[0]);
                getForecast(geoData[0]);
            } else {
                let message = "Something went wrong!";
                showStatus(message);
                setTimeout(hideStatus(), 1500);
            };
        };
    };
};

const getWeather = async (data) => {
    let {lat} = data;
    let {lon} = data;

    const req = `${endpointRoot}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}`;
    const res = await fetch(req);
    const weatherData = await res.json();

    if (res.status === 200) {
        currentWeather = weatherData.weather[0].main;
        currentTemperature = weatherData.main.temp;
        currentHumidity = weatherData.main.humidity;
        currentWindSpeed = weatherData.wind.speed;
        updateCurrentWeather();
    } else {
        let message = "Something went wrong!";
        showStatus(message);
        setTimeout(hideStatus(), 1500);
    };
};

const getForecast = async (data) => {
    let {lat} = data;
    let {lon} = data;

    const req = `${endpointRoot}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}`;
    const res = await fetch(req);
    const forecastData = await res.json();

    if (res.status === 200) {
        dayOneWeather = forecastData.list[0].weather[0].main;
        dayOneTemperature = forecastData.list[0].main.temp;
        dayOneHumidity = forecastData.list[0].main.humidity;
        dayOneWindSpeed = forecastData.list[0].wind.speed;

        dayTwoWeather = forecastData.list[1].weather[0].main;
        dayTwoTemperature = forecastData.list[1].main.temp;
        dayTwoHumidity = forecastData.list[1].main.humidity;
        dayTwoWindSpeed = forecastData.list[1].wind.speed;

        dayThreeWeather = forecastData.list[2].weather[0].main;
        dayThreeTemperature = forecastData.list[2].main.temp;
        dayThreeHumidity = forecastData.list[2].main.humidity;
        dayThreeWindSpeed = forecastData.list[2].wind.speed;

        dayFourWeather = forecastData.list[3].weather[0].main;
        dayFourTemperature = forecastData.list[3].main.temp;
        dayFourHumidity = forecastData.list[3].main.humidity;
        dayFourWindSpeed = forecastData.list[3].wind.speed;

        dayFiveWeather = forecastData.list[4].weather[0].main;
        dayFiveTemperature = forecastData.list[4].main.temp;
        dayFiveHumidity = forecastData.list[4].main.humidity;
        dayFiveWindSpeed = forecastData.list[4].wind.speed;
        updateForecast();
        showHidden();
        hideStatus();
    } else {
        let message = "Something went wrong!";
        showStatus(message);
        setTimeout(hideStatus(), 1500);
    };
};

// Update current weather
const updateCurrentWeather = () => {
    $("#selected-city").text(`${cityPlusState.city}, ${cityPlusState.state}`);
    $("#weather-descr").text(currentWeather);
    $("#current-temp").text(currentTemperature);
    $("#current-wind").text(`Wind: ${currentWindSpeed} mph`);
    $("#current-humidity").text(`Humidity: ${currentHumidity}%`);
    if (currentWeather === "Clear") {
        $("#current-icon").attr("src", sunny);
    } else if (currentWeather === "Clouds") {
        $("#current-icon").attr("src", cloudy);
    } else if (currentWeather === "Rain") {
        $("#current-icon").attr("src", rainy);
    } else if (currentWeather === "Thunderstorm") {
        $("#current-icon").attr("src", stormy);
    } else if (currentWeather === "Snow") {
        $("#current-icon").attr("src", snowy);
    };
};

// Update forecast
const updateForecast = () => {
    $("#day1-date").text(dayOneDate);
    $("#day1-descr").text(dayOneWeather);
    $("#day1-temp").text(dayOneTemperature);
    $("#day1-wind").text(`Wind: ${dayOneWindSpeed} mph`);
    $("#day1-humidity").text(`Humidity: ${dayOneHumidity}%`);
    if (dayOneWeather === "Clear") {
        $("#day1-icon").attr("src", sunny);
    } else if (dayOneWeather === "Clouds") {
        $("#day1-icon").attr("src", cloudy);
    } else if (dayOneWeather === "Rain") {
        $("#day1-icon").attr("src", rainy);
    } else if (dayOneWeather === "Thunderstorm") {
        $("#day1-icon").attr("src", stormy);
    } else if (dayOneWeather === "Snow") {
        $("#day1-icon").attr("src", snowy);
    };

    $("#day2-date").text(dayTwoDate);
    $("#day2-descr").text(dayTwoWeather);
    $("#day2-temp").text(dayTwoTemperature);
    $("#day2-wind").text(`Wind: ${dayTwoWindSpeed} mph`);
    $("#day2-humidity").text(`Humidity: ${dayTwoHumidity}%`);
    if (dayTwoWeather === "Clear") {
        $("#day2-icon").attr("src", sunny);
    } else if (dayTwoWeather === "Clouds") {
        $("#day2-icon").attr("src", cloudy);
    } else if (dayTwoWeather === "Rain") {
        $("#day2-icon").attr("src", rainy);
    } else if (dayTwoWeather === "Thunderstorm") {
        $("#day2-icon").attr("src", stormy);
    } else if (dayTwoWeather === "Snow") {
        $("#day2-icon").attr("src", snowy);
    };

    $("#day3-date").text(dayThreeDate);
    $("#day3-descr").text(dayThreeWeather);
    $("#day3-temp").text(dayThreeTemperature);
    $("#day3-wind").text(`Wind: ${dayThreeWindSpeed} mph`);
    $("#day3-humidity").text(`Humidity: ${dayThreeHumidity}%`);
    if (dayThreeWeather === "Clear") {
        $("#day3-icon").attr("src", sunny);
    } else if (dayThreeWeather === "Clouds") {
        $("#day3-icon").attr("src", cloudy);
    } else if (dayThreeWeather === "Rain") {
        $("#day3-icon").attr("src", rainy);
    } else if (dayThreeWeather === "Thunderstorm") {
        $("#day3-icon").attr("src", stormy);
    } else if (dayThreeWeather === "Snow") {
        $("#day3-icon").attr("src", snowy);
    };

    $("#day4-date").text(dayFourDate);
    $("#day4-descr").text(dayFourWeather);
    $("#day4-temp").text(dayFourTemperature);
    $("#day4-wind").text(`Wind: ${dayFourWindSpeed} mph`);
    $("#day4-humidity").text(`Humidity: ${dayFourHumidity}%`);
    if (dayFourWeather === "Clear") {
        $("#day4-icon").attr("src", sunny);
    } else if (dayFourWeather === "Clouds") {
        $("#day4-icon").attr("src", cloudy);
    } else if (dayFourWeather === "Rain") {
        $("#day4-icon").attr("src", rainy);
    } else if (dayFourWeather === "Thunderstorm") {
        $("#day4-icon").attr("src", stormy);
    } else if (dayFourWeather === "Snow") {
        $("#day4-icon").attr("src", snowy);
    };

    $("#day5-date").text(dayFiveDate);
    $("#day5-descr").text(dayFiveWeather);
    $("#day5-temp").text(dayFiveTemperature);
    $("#day5-wind").text(`Wind: ${dayFiveWindSpeed} mph`);
    $("#day5-humidity").text(`Humidity: ${dayFiveHumidity}%`);
    if (dayFiveWeather === "Clear") {
        $("#day5-icon").attr("src", sunny);
    } else if (dayFiveWeather === "Clouds") {
        $("#day5-icon").attr("src", cloudy);
    } else if (dayFiveWeather === "Rain") {
        $("#day5-icon").attr("src", rainy);
    } else if (dayFiveWeather === "Thunderstorm") {
        $("#day5-icon").attr("src", stormy);
    } else if (dayFiveWeather === "Snow") {
        $("#day5-icon").attr("src", snowy);
    };
};

// Save Data to Local Storage
const saveData = () => {
    newSearch = false;
    for (let i = 0; i < history.length; i++) {
        localStorage.setItem(i, JSON.stringify(history[i]));
    };
    loadData();
};

// Load Data from Local Storage
const loadData = () => {
    history = [];
    for (let i = 0; i < localStorage.length; i++) {
        history.push(JSON.parse(localStorage[i])); 
    };
    populateHistory();
};

// Populate history
const populateHistory = () => {
    $("#history-input").empty();    
    for (let i = 0; i < history.length; i++) {
        let newOption = $(`<option>${history[i].city}, ${history[i].state}</option>`);
        newOption.attr("city", `${history[i].city}`).attr("state", `${history[i].state}`).addClass("history-option");
        $(".history-dropdown").append(newOption);
    };
};

// Show or hide elements
const showHidden = () => {
    $(".forecast-day-grid-container").removeClass("hide").addClass("show");
};

const showStatus = (message) => {
    $(".status").text(message);
    $(".status").removeClass("hide").addClass("show");
};

const hideStatus = () => {
    $(".status").removeClass("show").addClass("hide");
};