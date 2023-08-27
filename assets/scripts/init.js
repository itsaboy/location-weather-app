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
        });
    };

    // Load history button event listener
    const loadButton = () => {
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

    // Delete history button event listener
    const deleteHistory = () => {
        $("#delete-button").on("click", function (event) {
            event.preventDefault();
            localStorage.clear();
            history = [];
            $("#history-input").empty();
            $("#history-input").append(`<option selected disabled>City, State</option>`);
        });
    };

    // Function Calls
    getDateAndTime();
    loadData();
    searchForCity();
    optionSelection();
    loadButton();
    deleteHistory();
});