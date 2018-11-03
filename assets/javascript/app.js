$(document).ready(function() {
    // URL for the New York Times article search API
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

    // Lists the articles for the search term.
    function listArticles() {
        // Updates the query to hold the search term
        queryURL += "?" + $.param({
            "api-key": "73f9ec084d96470cba85e2b765e683c6",
            "q": $("#inputSearch").val()
        });

        console.log(queryURL);

        // Get the beginning and end dates for the article list
        let beginDate = $("#startDate").val();
        let endDate = $("#endDate").val();
        console.log(beginDate);
        console.log(endDate);

        // AJAX retrieves the raw data for the search term
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(thingy) {
            // Loops through the number of records retrieved for the search term
            for(let i = 0; i < $("#inputNumber").val(); i++) {
                // Dump of all raw data
                let data = thingy.response.docs[i];

                // Creates the article div
                var articleDiv = $("<div>");

                // Headline of article
                var headline = $("<h2>");

                // Web URL of article
                var url = $("<a>").attr("href", data.web_url).text(data.headline.main);

                // Appends the link to 
                $(headline).append(url);

                // Byline
                var byline = $("<p>").text(data.byline.original);

                // Snippet
                var snippet = $("<p>").text(data.snippet);

                // Appends the headline, byline, and snippet
                $(articleDiv).append(headline, byline, snippet);

                // Appends the article to the list.
                $("#articleSpace").append(articleDiv);
            }
        });
    }

    $("#clearBtn").on("click",function(e){
        //Empty Article Space
        $("#articleSpace").empty();
    });

    $("#submitBtn").on("click",function(e){
        console.log(queryURL);
        e.preventDefault();

        //Call Magic Function
        console.log("Calling function...");
        listArticles();
    });
});