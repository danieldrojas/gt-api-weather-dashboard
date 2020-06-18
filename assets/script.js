$(document).ready(function () {
    console.log("inside the function");
    

    var currentDay = moment().format('l');


    // for (var i = 1; i <= 5; i++) {
    //     $(".card-deck").append($("<div id='card-forecast' class='card text-white bg-primary mb-3'>" +  "<h5 class='card-date'>" + currentDay + "</h5>" + "</div>"))
           

    // }
//Filling dates in forecast cards
    for (var i = 1; i <=5; i++){
        $("#forecast-date-" + i).text(currentDay)
    }



    function JSONresponse(city) {

        var APIkey = "2b1b04454e5d2f933e132a9826bc8f83"
        //current weather API
        var queryCurrentUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey + "&units=imperial"

        $.ajax({
            url: queryCurrentUrl,
            method: "get"
        }).then(function (response) {
            // console.log("bellow current weather")
            // console.log(response)
            var lon = response.coord.lon
            var lat = response.coord.lat
            var cityName = response.name 
            var temp = response.main.temp
            var hum = response.main.humidity
            // $("#temp").text("Temperature: " + temp + " F")
            // $("#temp").append("Temperature: " + temp + " F")

            
                $("#forecast-temp-1").text("Temperatura: " + temp)


            

            
           
            // var h6El = $("#main-properties");
            function cityProperties() {
                $(".card-body").append($("<h6>" +  cityName + "</h6>"))
                $(".card-body").append($("<h6>" + 'Temperature: ' + temp + ' F' + "</h6>"))
                $(".card-body").append($("<h6>" + 'Humidity: ' + hum + '%' + "</h6>"))
                $(".card-body").append($("<h6>" + 'Wind Spped: ' + response.wind.speed + ' MPH' + "</h6>"))
                
              
            
            }
           
            
            





            // console.log(response.main.temp)
            // console.log(response.main.humidity)
            // console.log(response.wind.speed)
            // var headline = response.response.docs[0].headline.main;
            // var byline = response.response.docs[0].byline.original
            // console.log(headline);
            // console.log(byline);

            // for (var i = 0; i < 5; i++) {
            //     var headline = response.response.docs[i].headline.main;
            //     console.log(headline);
            //     var byline = response.response.docs[i].byline.original

            //     if (byline === null) {
            //         byline = "The New York Times"
            //     }

            //     console.log(byline);

            // }
            //40 days forecast
            var dailyForecastUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely,current&appid=" + APIkey + "&units=imperial"

            $.ajax({
                url: dailyForecastUrl,
                method: "get"
            }).then(function (responseForecast) {
                // console.log("40 day forecast below")
                // console.log(responseForecast.daily[0].uvi)

                cityProperties()
                $(".card-body").append($("<h6>" + 'UV Indexs: ' + responseForecast.daily[0].uvi + "</h6>"))

                // $(".card-deck").append($("<div id='card-current-day-1'" +
                //     "class='card-body card text-white bg-primary mb-3'>" +
                //     "<h5 class='card-title'>" + 'Card title' + "</h5>"))



                // console.log(response.coord.lon)
                // console.log(response.coord.lat)
                // latitude = response.coord.lat

                // console.log(longitude)
                // console.log(latitude)

                // var headline = response.response.docs[0].headline.main;
                // var byline = response.response.docs[0].byline.original
                // console.log(headline);
                // console.log(byline);

                // for (var i = 0; i < 5; i++) {
                //     var headline = response.response.docs[i].headline.main;
                //     console.log(headline);
                //     var byline = response.response.docs[i].byline.original

                //     if (byline === null) {
                //         byline = "The New York Times"
                //     }

                //     console.log(byline);

                // }


            })


        })

    



    }


    //events 
    //Function
    $("#button").on("click", function (event) {
        event.preventDefault();

        var city = $("#city-input").val()
        JSONresponse(city);

        $(".card-body").empty()


    })


})
