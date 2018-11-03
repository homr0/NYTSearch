$(document).ready(function() {
    // URL for the New York Times article search API
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

    // Holds the beginning and end dates for the article search
    var beginDate = "";
    var endDate = "";

    $("#clearBtn").on("click",function(){
        //Empty Article Space
        $("#articleSpace").empty();
    });

    $("#submitBtn").on("click",function(){
        event.preventDefault();

        //Call Magic Function
        listArticles();
    });

    // Lists the articles for the search term.
    function listArticles() {
        // Updates the query to hold the search term
        queryURL += "?" + $.param({
            "api-key": "73f9ec084d96470cba85e2b765e683c6",
            "q": $("#inputSearch").val()
        });

        // AJAX retrieves the raw data for the search term
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            // Loops through the number of records retrieved for the search term
            for(let i = 0; i < $("#inputNumber").val(); i++) {
                // Dump of all raw data
                let data = response.docs[i];
                console.log(data);

                // Headline of article
                console.log(data.headline);

                // Web URL of article
                console.log(data.web_url);

                // Byline
                console.log(data.byline);

                // Snippet
                console.log(data.snippet);
            }
        });
    }
});