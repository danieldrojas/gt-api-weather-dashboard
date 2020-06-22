$(document).ready(function () {
    var arrayOfCities = []
  var  swappedCitiesArray =[]
    
    var ulEl = $('<ul>').addClass("card list-group list-group-flush")


    
    var citiesEntered = localStorage.getItem("citiesEntered")

    if (citiesEntered) {
        arrayOfCities = JSON.parse(citiesEntered)
        // lastCities()
    } else {
        arrayOfCities = []
    }
    console.log("Normal array of cities", arrayOfCities)

    if (arrayOfCities.length < 10) {
        for (var i = 0; i < 10; i++) {
            var liEl = $('<li>').addClass("list-group-item")
        
            liEl.text(arrayOfCities[i])
            ulEl.append(liEl)
            $("#last-cities").append(ulEl)
            $("#city-input").val("")
        }
    } else {
        

        for (var i = 0; i < 9; i++) {
            swappedCitiesArray[i] = arrayOfCities[i + 1]
            var liEl = $('<li>').addClass("list-group-item")
            liEl.text(swappedCitiesArray[i])
            ulEl.append(liEl)
            $("#last-cities").append(ulEl)
            $("#city-input").val("")
        }
        

        $("#city-input").val("")
        
    }
        

    

    

    console.log(arrayOfCities)
    



    function JSONresponse(city) {
        $("#fore-card").empty()


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
                $(".card-body").empty();
                $(".card-body").append($("<h6>" + cityName + "</h6>"))
                $(".card-body").append($("<h6>" + 'Temperature: ' + temp + ' F' + "</h6>"))
                $(".card-body").append($("<h6>" + 'Humidity: ' + hum + '%' + "</h6>"))
                $(".card-body").append($("<h6>" + 'Wind Spped: ' + response.wind.speed + ' MPH' + "</h6>"))
            }


            //40 days forecast
            var dailyForecastUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely,current&appid=" + APIkey + "&units=imperial"

            $.ajax({
                url: dailyForecastUrl,
                method: "get"
            }).then(function (responseForecast) {
                console.log('this is responseForcast', responseForecast)

                cityProperties()
                $(".card-body").append($("<h6>" + 'UV Indexs: ' + responseForecast.daily[0].uvi + "</h6>"))

                for (var i = 1; i <= 5; i++) {
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
    $("#button").on("click", function (event) {
        event.preventDefault();
        $(ulEl).empty()

        var inputCity = $("#city-input").val()


        if (inputCity.length > 0) {
            arrayOfCities.push(inputCity)
        } localStorage.setItem('citiesEntered', JSON.stringify(arrayOfCities))



        // function listOfCities() {
        for (var i = 0; i < arrayOfCities.length; i++) {
            var liEl = $('<li>').addClass("list-group-item")
            if (i < 10) {
                liEl.text(arrayOfCities[i])
                ulEl.append(liEl)
                $("#last-cities").append(ulEl)
                $("#city-input").val("")
            }

        }

        





        // listOfCities()    
        JSONresponse(inputCity);
    })







})