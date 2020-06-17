

$(document).ready(function () {


    console.log("inside the function");

    var queryUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=5TxCNtAAh0KrAt7kh9dDtyJqiGBhcuOO&q=florida"


    $.ajax({
        url: queryUrl,
        method: "get"
    }).then(function (response) {
        console.log(response.response.docs[0])
        // var headline = response.response.docs[0].headline.main;
        // var byline = response.response.docs[0].byline.original
        // console.log(headline);
        // console.log(byline);

        for (var i = 0; i < 5; i++) {
            var headline = response.response.docs[i].headline.main;
            console.log(headline);
            var byline = response.response.docs[i].byline.original

            if (byline === null) {
                byline = "The New York Times"
            }

            console.log(byline);

        }


    })
})
