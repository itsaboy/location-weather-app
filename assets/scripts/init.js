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
            city = $(this).siblings("#city-input").val().toUpperCase();
            state = $(this).siblings("#state-input").val().toUpperCase();
            cityPlusState = {
                city: city,
                state: state
            };
            getLocation(cityPlusState);
        });
    };

    // Option selection
    const optionSelection = () => {
        $("#history-input").on("change", function () {
            city = $("#history-input option:selected").attr("city");
            state = $("#history-input option:selected").attr("state");
            cityPlusState = {
                city: city,
                state: state
            };
            console.log(cityPlusState);
        });
    };

    // History button event listener
    const historyLoad = () => {
        $("#history-button").on("click", function (event) {
            event.preventDefault();
            newSearch = false;
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
    optionSelection();
    historyLoad();

});