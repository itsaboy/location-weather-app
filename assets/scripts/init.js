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
            city = $(this).siblings("#search-input").val();
            getLocation(city);
        });
    };

    // Function Calls
    setInterval(getDateAndTime, 1);
    loadData();
    searchForCity();
    historyButtons();

});