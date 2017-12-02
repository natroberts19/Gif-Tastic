// Initial array of giphy buttons
var topics = ["Justin Timberlake SNL", "Melissa McCarthy SNL", "Christopher Walken SNL", "Alec Baldwin SNL", "Steve Martin SNL", "John Goodman SNL"];
console.log(topics);

// Function for dumping the JSON content for each button into the div.  Need to get the rating and static url.
function displayGifInfo() {
    var giphyName = $(this).attr("data-item");
    console.log(giphyName);

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + giphyName + "&rating=pg&api_key=nnnYO03MD3UGzt8ao7AY20uyywstLlNR&limit=10";

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function (response) {
        $("#giphy-dump").empty();

        for (i = 0; i < response.data.length; i++) {
            console.log("GIF Rating: " + response.data[i].rating);

            // Create a div to hold the gif's
            var gifDiv = $("<div class='gif'>");
            // Get the static URL for the image
            var staticURL = response.data[i].images.fixed_height_still.url;
            console.log("Static Image: " + response.data[i].images.fixed_height_still.url);
            // Create an HTML element to store the image
            var image = $("<img>").attr("src", staticURL);
            // Append the image
            gifDiv.append(image);
            // Variable to store the rating data
            var gifRating = response.data[i].rating;
            // Create an HTML element paragraph to store the rating
            var para = $("<p>").text("Rating: " + gifRating);
            console.log(gifRating);
            // Display the rating
            gifDiv.append(para);

            // Put the gifs above each other
            $("#giphy-dump").prepend(gifDiv);

            $(".gif").on("click", function () {
                // Get the animated URL for the image
                var animatedURL = response.data[i].images.fixed_height.url;
                console.log("Animated Image: " + response.data[i].images.fixed_height.url);

                // Check if the variable state is equal to 'still'.
                var state = $(this).attr("data-state");
                console.log(this);

                // Then create if/else to toggle between static and animated.
                if (state === "still") {
                    $(this).attr("src", $(this).attr("animatedURL"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("staticURL"));
                    $(this).attr("data-state", "still");
                }
            })
        }
    });
}

// Function to render the buttons from the topics array. These buttons will be used to show the giphys:
function renderButtons() {
    $("#buttons-dump").empty();

    for (var j = 0; j < topics.length; j++) {
        var a = $("<button>");
        a.addClass("gif");
        a.attr("data-item", topics[j]);
        a.text(topics[j]);
        $("#buttons-dump").append(a);
        console.log(a);
    }
}

// This function handles events where one button is clicked
$("#find-giphy").on("click", function (event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var giphy = $("#giphy-input").val().trim();
    // The giphy from the textbox is then added to our array
    topics.push(giphy);
    console.log(giphy);

    // calling renderButtons which handles the processing of our giphy array
    renderButtons();
});

// links back to the generic function to capture Gif Info. Provides an event listener to all elements with class of .gif
$(document).on("click", ".gif", displayGifInfo);

renderButtons();