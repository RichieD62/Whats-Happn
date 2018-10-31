

var userInput = $("#location").val();

var queryURL = "https://api.seatgeek.com/2/events?client_id=9a54676ab29b8413937016dcd39f5dc547e3eb789ef08953571955a8c8cd88d4"

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    var results = response.data;
    console.log(results);
})

