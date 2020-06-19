$(document).ready(function () {
    console.log("inside the function");
    

    var currentDay = moment().format('l');

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
                console.log('this is responseForcast',responseForecast)

                cityProperties()
                $(".card-body").append($("<h6>" + 'UV Indexs: ' + responseForecast.daily[0].uvi + "</h6>"))

                for (var i = 1; i <= 5; i++){
                    var momentDate = moment().add(i, 'days')
                    
                    console.log('this is our date to putttt', momentDate.format('l'))
    
                    var cardDiv = $('<div>').attr('id', "card-forecast").addClass('card text-white bg-primary')
                    
                    var date = $('<h5>').addClass("card-title")
                    date.attr('id', 'forecast-date-' + i)
                    date.text(momentDate.format('l'))
                    
                    var temp = $('<h5>').addClass("card-title style='margin:20px'")
                    temp.attr('id', 'forecast-temp-' + i)
                    temp.attr('style', 'font-size: .8rem')
                    temp.text("Temp: " + responseForecast.daily[i].temp.day + " °F")
                    
                    var humidity = $('<h5>').addClass("card-title")
                    humidity.attr('id', 'forecast-hum-' + i)
                    humidity.attr('style', 'font-size: .8rem')
                    humidity.text("Humidity: " + responseForecast.daily[i].humidity + '%')


                    cardDiv.append(date, temp, humidity)

                    $('.card-deck').append(cardDiv);



                }
               



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
