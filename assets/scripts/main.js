// Gets the geo-location of a searched city, state
const getLocation = async (cityPlusState) => {
    const req = `${endpointRoot}/geo/1.0/direct?q=${cityPlusState.city},${cityPlusState.state},ISO 3166-2&limit=&appid=${weatherAPIKey}`;
    const res = await fetch(req);
    const geoData = await res.json();

    // Checks if searched location already exists in the history
    if (history.some(obj => obj.city === cityPlusState.city)
        && history.some(obj => obj.state === cityPlusState.state)
        && newSearch === true) {
        newSearch = false;
        
        message = "Already in history!";
        statusInfo(message);
    } else {
        // Checks if searched location was valid
        if (!geoData[0]) {
            message = "Location not found!";
            statusInfo(message);
        } else {
            // Shows user the requested info is loading
            message = "Loading...";
            statusInfo(message);
            /* Pushes new location data to the history array, saves the 
            data locally, then calls the getWeather and getForecast functions
            with the received geo-data as arguments */
            if (res.status === 200 && newSearch === true) {
                history.push(cityPlusState);
                saveData();

                getWeather(geoData[0]);
                getForecast(geoData[0]);
            /* Calls the getWeather and getForecast functions with the received
            geo-data as arguments but does not push to the history array or save locally
            to prevent duplicate saved data */
            } else if (res.status === 200 && newSearch === false) {
                getWeather(geoData[0]);
                getForecast(geoData[0]);
            // Error handling    
            } else {
                message = "Something went wrong!";
                statusInfo(message);
            };
        };
    };
};

/* Gets the current weather of the longitude and latitude coordinates from the
geoData variable passed in as an argument by the getLocation function */
const getWeather = async (data) => {
    let {lat} = data; // longitude
    let {lon} = data; // latitude

    const req = `${endpointRoot}/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherAPIKey}`;
    const res = await fetch(req);
    const weatherData = await res.json();

    /* Sets the global variables that denote the current weather and 
    date information for the location coordinates, then
    calls the function that display said information on the page */
    if (res.status === 200) {
        unixTime = dayjs().utc().unix() * 1000;
        unixOffset = weatherData.timezone;
        currentDate = dayjs(unixTime - unixOffset).format("MMM-D-YYYY");
        currentDayOfWeek = dayjs(unixTime - unixOffset).format("dddd");
        currentWeather = weatherData.weather[0].main;
        currentTemperature = weatherData.main.temp;
        currentHumidity = weatherData.main.humidity;
        currentWindSpeed = weatherData.wind.speed;

        updateCurrentWeather();
    // Error handling
    } else {
        let message = "Something went wrong!";
        statusInfo(message);
    };
};

/* Gets the 5-day weather forecast of the longitude and latitude coordinates from the
geoData variable passed in as an argument by the getLocation function */
const getForecast = async (data) => {
    let {lat} = data; // longitude
    let {lon} = data; // latitude

    const req = `${endpointRoot}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherAPIKey}`;
    const res = await fetch(req);
    const forecastData = await res.json();

    /* Sets the global variables that denote the 5-day forecast and 
    date information for the location coordinates, then
    calls the function that display said information on the page */
    if (res.status === 200) {
        // Day one
        dayOneDate = dayjs(unixTime).add(1, "day").startOf("day").format("MMM-D-YYYY");
        dayOneWeather = forecastData.list[0].weather[0].main;
        dayOneTemperature = forecastData.list[0].main.temp;
        dayOneHumidity = forecastData.list[0].main.humidity;
        dayOneWindSpeed = forecastData.list[0].wind.speed;

        // Day two
        dayTwoDate = dayjs(unixTime).add(2, "day").startOf("day").format("MMM-D-YYYY");
        dayTwoWeather = forecastData.list[1].weather[0].main;
        dayTwoTemperature = forecastData.list[1].main.temp;
        dayTwoHumidity = forecastData.list[1].main.humidity;
        dayTwoWindSpeed = forecastData.list[1].wind.speed;

        // Day three
        dayThreeDate = dayjs(unixTime).add(3, "day").startOf("day").format("MMM-D-YYYY");
        dayThreeWeather = forecastData.list[2].weather[0].main;
        dayThreeTemperature = forecastData.list[2].main.temp;
        dayThreeHumidity = forecastData.list[2].main.humidity;
        dayThreeWindSpeed = forecastData.list[2].wind.speed;

        // Day four
        dayFourDate = dayjs(unixTime).add(4, "day").startOf("day").format("MMM-D-YYYY");
        dayFourWeather = forecastData.list[3].weather[0].main;
        dayFourTemperature = forecastData.list[3].main.temp;
        dayFourHumidity = forecastData.list[3].main.humidity;
        dayFourWindSpeed = forecastData.list[3].wind.speed;

        // Day five
        dayFiveDate = dayjs(unixTime).add(5, "day").startOf("day").format("MMM-D-YYYY");
        dayFiveWeather = forecastData.list[4].weather[0].main;
        dayFiveTemperature = forecastData.list[4].main.temp;
        dayFiveHumidity = forecastData.list[4].main.humidity;
        dayFiveWindSpeed = forecastData.list[4].wind.speed;
        
        updateForecast();
    // Error handling
    } else {
        let message = "Something went wrong!";
        statusInfo(message);
    };
};

// Displays current weather information
const updateCurrentWeather = () => {
    $("#current-date").text(currentDate);    
    $("#current-time").text(currentDayOfWeek);
    $("#selected-city").text(`${cityPlusState.city}, ${cityPlusState.state}`);
    $("#weather-descr").text(currentWeather);
    $("#current-temp").text(`${currentTemperature}° F`);
    $("#current-wind").text(`Wind: ${currentWindSpeed} mph`);
    $("#current-humidity").text(`Humidity: ${currentHumidity}%`);

    // Changes current weather icon
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
    } else if (currentWeather === "Mist") {
        $("#current-icon").attr("src", misty);
    };

    showHidden();
};

// Displays 5-day forecast information
const updateForecast = () => {
    // Day one
    $("#day1-date").text(dayOneDate);
    $("#day1-descr").text(dayOneWeather);
    $("#day1-temp").text(`${dayOneTemperature}° F`);
    $("#day1-wind").text(`Wind: ${dayOneWindSpeed} mph`);
    $("#day1-humidity").text(`Humidity: ${dayOneHumidity}%`);

    // Selects forecast date's weather icon
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
    } else if (currentWeather === "Mist") {
        $("#current-icon").attr("src", misty);
    };

    // Day two
    $("#day2-date").text(dayTwoDate);
    $("#day2-descr").text(dayTwoWeather);
    $("#day2-temp").text(`${dayTwoTemperature}° F`);
    $("#day2-wind").text(`Wind: ${dayTwoWindSpeed} mph`);
    $("#day2-humidity").text(`Humidity: ${dayTwoHumidity}%`);

    // Selects forecast date's weather icon
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
    } else if (currentWeather === "Mist") {
        $("#current-icon").attr("src", misty);
    };

    // Day three
    $("#day3-date").text(dayThreeDate);
    $("#day3-descr").text(dayThreeWeather);
    $("#day3-temp").text(`${dayThreeTemperature}° F`);
    $("#day3-wind").text(`Wind: ${dayThreeWindSpeed} mph`);
    $("#day3-humidity").text(`Humidity: ${dayThreeHumidity}%`);

    // Selects forecast date's weather icon
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
    } else if (currentWeather === "Mist") {
        $("#current-icon").attr("src", misty);
    };

    // Day four
    $("#day4-date").text(dayFourDate);
    $("#day4-descr").text(dayFourWeather);
    $("#day4-temp").text(`${dayFourTemperature}° F`);
    $("#day4-wind").text(`Wind: ${dayFourWindSpeed} mph`);
    $("#day4-humidity").text(`Humidity: ${dayFourHumidity}%`);

    // Selects forecast date's weather icon
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
    } else if (currentWeather === "Mist") {
        $("#current-icon").attr("src", misty);
    };

    // Day five
    $("#day5-date").text(dayFiveDate);
    $("#day5-descr").text(dayFiveWeather);
    $("#day5-temp").text(`${dayFiveTemperature}° F`);
    $("#day5-wind").text(`Wind: ${dayFiveWindSpeed} mph`);
    $("#day5-humidity").text(`Humidity: ${dayFiveHumidity}%`);

    // Selects forecast date's weather icon
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
    } else if (currentWeather === "Mist") {
        $("#current-icon").attr("src", misty);
    };
};

// Save Data to Local Storage then loads the saved data
const saveData = () => {
    newSearch = false;
    for (let i = 0; i < history.length; i++) {
        localStorage.setItem(i, JSON.stringify(history[i]));
    };
    loadData();
};

// Loads Data from Local Storage then populates the history dropdown menu
const loadData = () => {
    history = [];
    for (let i = 0; i < localStorage.length; i++) {
        history.push(JSON.parse(localStorage[i])); 
    };
    populateHistory();
};

// Populate history dropdown
const populateHistory = () => {
    $("#history-input").empty();
    $("#history-input").append(`<option selected disabled>City, State</option>`);     
    for (let i = 0; i < history.length; i++) {
        let newOption = $(`<option>${history[i].city}, ${history[i].state}</option>`);
        newOption.attr("city", `${history[i].city}`).attr("state", `${history[i].state}`).addClass("history-option");
        $(".history-dropdown").append(newOption);
    };
};

// Shows hidden elements and calls animation functions
const showHidden = () => {
    $(".forecast-day-grid-container").removeClass("hide").addClass("show");
    $(".weather-grid-item").removeClass("hide").addClass("show");
    slideAnimation();
    fadeAnimation();
};

/* Shows status to user (loading, error, etc etc...)
then hides the status after one second */
const statusInfo = (message) => {
    $(".status").text(message);
    $(".status").removeClass("hide").addClass("show");
    setTimeout(() => {
        $(".status").removeClass("show").addClass("hide");
    }, 1000);
};

// Starts and resets slide animation 
const slideAnimation = () => {
    $(".forecast-day-grid-container").addClass("slide-in");
    setTimeout(() => {
        $(".forecast-day-grid-container").removeClass("slide-in");
    }, 1000);
};

// Starts and resets fade-in animation
const fadeAnimation = () => {
    $(".weather-grid-item").addClass("fade-in");
    setTimeout(() => {
        $(".weather-grid-item").removeClass("fade-in");
    }, 1000);
};