$(document).ready(function() {
    // URL for the New York Times article search API
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

    // Parses the date into YYYYYMMDD
    function parseDate(date) {
        // Makes sure that the length is correct
        let formattedDate = "";

        // Makes sure there are enough characters to format the date correctly to YYYYMMDD
        if(date.length == 10) {
            // If there is a "-" or "/", then the date is presumably MM-DD-YYYY, so it must be corrected to YYYYMMDD
            if((date.charAt(2) == "-") || (date.charAt(2) == "/")) {
                date = date.slice(-4) + date(0, 2) + date(3, 2);
                console.log(date);
            }

            // Removes any "-" and replaces them with "-"
            formattedDate = date.replace(/-/g, "");
        }

        // Returns the formatted date or an empty string if incorrect or no date
        return formattedDate;
    }

    // Lists the articles for the search term.
    function listArticles() {
        // Updates the query to hold the search term
        queryURL += "?" + $.param({
            "api-key": "73f9ec084d96470cba85e2b765e683c6",
            "q": $("#inputSearch").val()
        });

        // Get the beginning and end dates for the article list
        let beginDate = $("#startDate").val();
        let endDate = $("#endDate").val();

        beginDate = parseDate(beginDate);
        endDate = parseDate(endDate);

        // Add in starting date
        if(beginDate !== "") {
            queryURL += "&begin_date=" + beginDate;
        }

        // Add in end date
        if(endDate !== "") {
            queryURL += "&end_date=" + endDate;
        }

        // AJAX retrieves the raw data for the search term
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(articles) {

            // Gets the number of articles to output
            let bulletin = articles.response.docs.length;
            
            // Shows all articles available unless the number of articles to show is limited (for 10 or less articles)
            if(bulletin > $("#inputNumber").val()) {
                bulletin = $("#inputNumber").val();
            }

            // Loops through the number of records retrieved for the search term
            for(let i = 0; i < bulletin; i++) {
                // Dump of all raw data
                let data = articles.response.docs[i];

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
        e.preventDefault();

        //Call Magic Function
        listArticles();
    });
});