// config variables
var jumbo = $(".jumbotron"),
    city_input = $("#city"),
    city_submit = $("#submit-city"),
    weather_display = $("#weather-forecast"),
    week_forecast = $("#week-forecast"),
    days = "5",
    api_key = "5f4daa4b1c6da4effe6b7b5351622fef";

// config moment js
var currentDate = moment().format("dddd, MMMM Do YYYY");

// display 5-day weather forecast
var displayFiveDays = function(lat, lon) {

    // config api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?cnt=" + days + "&lat=" + lat + "&lon=" + lon + "&appid=" + api_key;

    // make a get request
    $.ajax({
        url: apiUrl,
        type: "GET",
        dataType: "json",
        success: function(response) {
            console.log(response);
            week_forecast.text(response.list[0]);
        },
        error: function(status, err) {
            console.log("ERROR: " + status, err);
        }
    });
}

// submit city search
city_submit.click(function(event) {
    event.preventDefault();

    // save city
    var city = city_input.val().trim();

    // apply api url
    var api_url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + api_key;

    // make a get request
    $.ajax({
        url: api_url,
        type: "GET",
        dataType: "json",
        success: function(response) {

            // config responses
            var lat = response.coord.lat,
                lon = response.coord.lon;

            // call displayFiveDays
            displayFiveDays(lat, lon);

            console.log(response);
            weather_display.text(
                response.name + " " +
                response.main.temp + " " +
                response.wind.speed + " " +
                response.main.humidity + " " +
                response.weather[0].main
            );
        },
        error: function(status, err) {
            console.log("ERROR: " + status, err);
        }
    });
});


// load previous searches