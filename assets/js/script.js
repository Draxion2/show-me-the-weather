// config variables
var jumbo = $(".jumbotron"),
    city_input = $("#city"),
    city_submit = $("#submit-city"),
    weather_display = $("#weather-forecast"),
    api_key = "5f4daa4b1c6da4effe6b7b5351622fef";

// config moment js
var currentDate = moment().format("dddd, MMMM Do YYYY");


// submit city search
city_submit.click(function(event) {
    event.preventDefault();

    // save city
    var city = city_input.val().trim();

    var api_url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + api_key;

    // make a get request
    $.ajax({
        url: api_url,
        type: "GET",
        dataType: "json",
        success: function(response) {
            console.log(response);
            weather_display.text(
                response.name + " " +
                response.main.temp + " " +
                response.wind.speed + " " +
                response.main.humidity + " " +
                response.weather[0].description
            );
        },
        error: function(status, err) {
            console.log("ERROR: " + status, err);
        }
    });
});


// load previous searches