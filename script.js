document.getElementById("weatherSubmit").addEventListener("click", function (event) {
    event.preventDefault();
    const value = document.getElementById("weatherInput").value;
    if (value === "")
        return;
    console.log(value);
    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial&lang=en" + "&APPID=2201c68ad889109462a7a2938ff5864d";
    fetch(url)
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            let results = '<div class="current_weather">';
            results += '<h2>Weather in ' + json.name + "</h2>";
            for (let i = 0; i < json.weather.length; i++) {
                results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
            }
            results += '<h2>' + json.main.temp + " &deg;F</h2>"
            results += "<p>"
            for (let i = 0; i < json.weather.length; i++) {
                results += toTitleCase(json.weather[i].description);
                if (i !== json.weather.length - 1)
                    results += ", "
            }
            results += '</p><p> Humidity: ' + json.main.humidity + "%</p>";
            results += "</div>";
            document.getElementById("weatherResults").innerHTML = results;
        });
    const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=2201c68ad889109462a7a2938ff5864d";
    fetch(url2)
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            let forecast = "";
            forecast += '<div class="forecast"><h2> Forecast </h2></div>';
            forecast += "<section class=\"portfolio\">";
            for (let i = 0; i < json.list.length; i++) {
                myDate = json.list[i].dt_txt.substring(0, 10);
                let testDate = myDate;
                while (testDate === myDate) {
                    forecast += "<div class=\"grid\">";
                    forecast += "<h3>" + moment(json.list[i].dt_txt).format('MMM Do YYYY, h:mm a') + "</h3>";
                    forecast += "<p>Temperature: " + json.list[i].main.temp + "</p>";
                    forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
                    forecast += "</div>";
                    i++;
                    if (i >= json.list.length)
                        break;

                    testDate = json.list[i].dt_txt.substring(0, 10);
                }
            }
            forecast += "</section>"
            document.getElementById("forecastResults").innerHTML = forecast;
        });
});

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}