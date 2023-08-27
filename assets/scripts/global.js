// API variables
const endpointRoot = "https://api.openweathermap.org";
const weatherAPIKey = "";

// Search variables
let history = [];
let city;
let state;
let cityPlusState;
let newSearch = false;

// Current weather
let currentWeather;
let currentTemperature;
let currentHumidity;
let currentWindSpeed;

// 5-day forecast
let dayOneWeather;
let dayOneTemperature;
let dayOneHumidity;
let dayOneWindSpeed;

let dayTwoWeather;
let dayTwoTemperature;
let dayTwoHumidity;
let dayTwoWindSpeed;

let dayThreeWeather;
let dayThreeTemperature;
let dayThreeHumidity;
let dayThreeWindSpeed;

let dayFourWeather;
let dayFourTemperature;
let dayFourHumidity;
let dayFourWindSpeed;

let dayFiveWeather;
let dayFiveTemperature;
let dayFiveHumidity;
let dayFiveWindSpeed;

// Time settings
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

// Current Date
let currentDate;
let currentTime;

// 5-day forecast dates
let dayOneDate = dayjs().add(1, "day").startOf("day").format("MMM-D-YYYY");
let dayTwoDate = dayjs().add(2, "day").startOf("day").format("MMM-D-YYYY");
let dayThreeDate = dayjs().add(3, "day").startOf("day").format("MMM-D-YYYY");
let dayFourDate = dayjs().add(4, "day").startOf("day").format("MMM-D-YYYY");
let dayFiveDate = dayjs().add(5, "day").startOf("day").format("MMM-D-YYYY");

// Weather icon sources

const sunny = "./assets/icons/weather/sunny.svg";
const cloudy = "./assets/icons/weather/cloudy.svg";
const rainy = "./assets/icons/weather/rainy.svg";
const stormy = "./assets/icons/weather/stormy.svg";
const snowy = "./assets/icons/weather/snowy.svg";