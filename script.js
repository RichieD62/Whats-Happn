

$(document).ready(function () {


    function submit() {
        $("#submit-button").on("click", function (event) {

            event.preventDefault();

           
            var userInput = $("#location").val()
            var queryURL = "https://api.seatgeek.com/2/venues?&client_id=MTM3MzQ5ODJ8MTU0MTAzNTk1NC4z&client_secret=bafaccd7c9def60e73e3d2fcfcca15297124b926e7f941a51303a63dc998c0f3&postal_code=" + userInput 

            console.log(userInput);

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                var results = response.data;
                console.log(response);
            });
        });
    };

    submit();

});