// API variables
const endpointRoot = "https://api.openweathermap.org";
const weatherAPIKey = "fd03838b9b2723c3ea2712dc8e4df0e6";

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

// Current time & date
let unixTime;
let unixOffset;
let currentDate;
let currentDayOfWeek;

// 5-day forecast dates
let dayOneDate;
let dayTwoDate;
let dayThreeDate;
let dayFourDate;
let dayFiveDate;

// Weather icon sources
const sunny = "./assets/icons/weather/sunny.svg";
const cloudy = "./assets/icons/weather/cloudy.svg";
const rainy = "./assets/icons/weather/rainy.svg";
const stormy = "./assets/icons/weather/stormy.svg";
const snowy = "./assets/icons/weather/snowy.svg";
const misty = "./assets/icons/weather/misty.svg"