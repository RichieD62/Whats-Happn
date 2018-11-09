function submit() {

    var modal = $("#myModal2")
    var span = $(".close");
    var eventName = $("#event-name")

    $("#submitBtn").on("click", function (event) {
        event.preventDefault();


        var userZip = $("#zip-code").val()
        var queryURL = "https://api.seatgeek.com/2/events?venue.postal_code=" + userZip + "&client_id=MTM3MzQ5ODJ8MTU0MTAzNTk1NC4z&client_secret=bafaccd7c9def60e73e3d2fcfcca15297124b926e7f941a51303a63dc998c0f3&";

        if (eventName.val().length > 0 || (!isNaN(userZip) && userZip.length === 5)) {
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);

                for (var i = 0; i < response.events.length; i++) {

                    var event = {
                        id: response.events[i].id,
                        name: response.events[i].title,
                        dateTime: response.events[i].datetime_local,
                        venue: response.events[i].venue.name,
                        address: response.events[i].venue.address,
                        tickets: response.events[i].url
                    };

                    cardGenerator(event)

                };
            });
        } else {
            console.log("nope");
            $(modal).css("display", "block");
            $(span).on("click", function () {
                $(modal).css("display", "none");
            })
        }
    })

}


function cardGenerator(event) {
    let HTMLTemplate = ''

    HTMLTemplate += `
    <div class="col-md-4 mt-4">
    <div class="card" origin="Seatgeek" eventCode=${event.id} name=${event.name}>
    <div class="card-body">
                   <img class="img-fluid mb-2" src="https://trunited.com/media/catalog/product/s/e/seat_geek_logo_5.jpg"> 
              </div>
              <div class="card-body">
                   <div class="card-text">
                        <h2 class="text-center card-title">${event.name}</h2> 
                        <p class="lead text-info">Event Information:</p>
                        <p>${event.venue}...</p>
                        <span class="badge badge-primary">Date & Time: ${event.dateTime}</span>

                        <a href="${event.tickets}" target="_blank" class="btn btn-primary btn-block mt-4">Get Tickets</a>

                        <button class="btn btn-secondary btn-block mt-1 favorite">Add To Favorites</button>

                        <button class="btn btn-danger btn-block mt-1 remove">Remove</button>

                        
                   </div>
              </div>
         </div>
    </div>

`;
    $("#result").prepend(HTMLTemplate)
}

$(document).ready(submit)