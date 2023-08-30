$().ready(() => {

    /* Button that sets properties of the cityPlusState object to 
    be passed into the getLocation function as an argument */
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
            // Prevents user from leaving city search input empty
            if (!city) {
                message = "No city selected!";
                statusInfo(message);
            } else {
                getLocation(cityPlusState);
            };
            // Clears form on submission
            $("#city-input").val("");
            $("#state-input").val("Alabama");
        });
    };

    /* On change event listener that sets properties of the cityPlusState
    object when an option in the history dropdown menu is selected */
    const optionSelection = () => {
        $("#history-input").on("change", () => {
            city = $("#history-input option:selected").attr("city");
            state = $("#history-input option:selected").attr("state");
            cityPlusState = {
                city: city,
                state: state
            };
        });
    };

    /* Button that calls the getLocation function with the cityPlusState object
    set by the history dropdown as its argument */
    const loadButton = () => {
        $("#history-button").on("click", function (event) {
            event.preventDefault();
            newSearch = false;
            // Prevents console error if no location is selected in dropdown
            if (!city) {
                message = "No location selected!";
                statusInfo(message);
            } else {
                for (let i = 0; i < history.length; i++) {
                    if (cityPlusState.city === history[i].city && cityPlusState.state === history[i].state) {
                        getLocation(cityPlusState);
                    };
                };
            };
        });
    };

    // Button that clears the local storage, history array and history dropdown options
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
    loadData();
    searchForCity();
    optionSelection();
    loadButton();
    deleteHistory();
});