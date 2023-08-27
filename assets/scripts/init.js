$().ready(() => {

    // Get current date and time
    const getDateAndTime = () => {
        currentDate = dayjs().format("MMM-D-YYYY");
        currentTime = dayjs().format("h:mm A");
        $("#current-date").text(currentDate);    
        $("#current-time").text(currentTime);
    };

    // Search button event listener
    const searchForCity = () => {
        $("#search-button").on("click", function (event) {
            event.preventDefault();
            newSearch = true;
            city = $(this).siblings("#city-input").val();
            state = $(this).siblings("#state-input").val();
            cityPlusState = {
                city: city,
                state: state
            };
            getLocation(cityPlusState);
        });
    };

    // History button event listener
    const historyLoad = () => {
        $("#history-input").on("change", function () {
            city = $(this).children().attr("city");
            state = $(this).children().attr("state");
            cityPlusState = {
                city: city,
                state: state
            };
            console.log(cityPlusState);
        })
        $(".history-button").on("click", function (event) {
            event.preventDefault();
            newSearch = false;
            //city = $(this).siblings("#history-input").children(".history-option").attr("city");
            //state = $(this).siblings("#history-input").children(".history-option").attr("state");
            for (let i = 0; i < history.length; i++) {
                if (cityPlusState.city === history[i].city && cityPlusState.state === history[i].state) {
                    getLocation(cityPlusState);
                };
            };
        });
    };

    // Function Calls
    setInterval(getDateAndTime, 1);
    loadData();
    searchForCity();
    historyLoad();

});