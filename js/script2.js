$(document).ready(function () {


    function submit() {
        $("#submitBtn").on("click", function (event) {

            event.preventDefault();

            var userZip = $("#zip-code").val()
            var queryURL2 = "https://api.seatgeek.com/2/events?&client_id=MTM3MzQ5ODJ8MTU0MTAzNTk1NC4z&client_secret=bafaccd7c9def60e73e3d2fcfcca15297124b926e7f941a51303a63dc998c0f3&venue.postal_code=" + userZip;


            // $.ajax({

            // }).then(function(){

            // }).then(function(){

            // }).

           
                $.ajax({
                    url: queryURL2,
                    method: "GET"
                }).then(function (response) {
                    console.log(queryURL2)
                    console.log(response);

                    for (var i = 0; i < response.events.length; i++) {
                        var newDiv = $("<div class='item'>");

                        var event = {
                            name: response.events[i].title,
                            dateTime: response.events[i].datetime_local,
                            venue: response.events[i].venue.name,
                            address: response.events[i].venue.address,
                            tickets: response.events[i].url
                        };

                        // var pEvent = $("<p>").text("Event: " + event.name);
                        // var pDateTime = $("<p>").text("Date and Time: " + event.dateTime);
                        // var pVenue = $("<p>").text("Venue: " + event.venue);
                        // var pAddress = $("<p>").text("Address: " + event.address);
                        // var pTix = $("<p>").text("Tickets: " + event.tickets);

                            let HTMLTemplate = '';

                            // $(event).each(response => {
                                console.log('foo')
                                HTMLTemplate += `
                                     <div class="col-md-4 mt-4">
                                          <div class="card">
                                               <div class="card-body">
                                                    <img class="img-fluid mb-2" src="https://via.placeholder.com/200"> 
                                               </div>
                                               <div class="card-body">
                                                    <div class="card-text">
                                                         <h2 class="text-center card-title">${event.name}</h2>
                                                         <p class="lead text-info">Event Information:</p>
                                                         <p>${event.venue}...</p>
                                                         <span class="badge badge-primary">Date & Time: ${event.dateTime}</span>
                  
                                                         <a href="${event.tickets}" target="_blank" class="btn btn-primary btn-block mt-4">Get Tickets</a>
                  
                                                         <a href=${event.tickets}"target="_blank" class="btn btn-alert alert-danger btn-block mt-4">Add To Favorites</a>
                                                         
                                                    </div>
                                               </div>
                                          </div>
                                     </div>
                                
                                `;
                                $("#result").prepend(HTMLTemplate)
                           //});
                  
                           //document.getElementById('#result').innerHTML = HTMLTemplate;

                        //  newDiv.prepend(HTMLTemplate);
                        // $("#result").append(newDiv);
                        // console.log(event);


                        // console.log("Look at these events: " + response.events[i].title);
                        // console.log("Look at these dates and times: " + response.events[i].datetime_local);
                        // console.log("Look at this link to tickets: " + response.events[i].url);
                        // console.log("Look at this venue: " + response.events[i].venue.name);
                        // console.log("Look at this address: " + response.events[i].venue.address);
                        // console.log("Event: " + response.events[i].title);

                        //console log link to tix
                        //console log another thing
                        //store in an object 
                    }
                })

        })

    }



    submit();


});




// var event = {
//     name: response.events[i].title,
//     dateTime: response.events[i].datetime_local,
//     venue: response.events[i].venue.name,
//     address: response.events[i].venue.address,
//     tickets: response.events[i].url
// };

// var pEvent = $("<p>").text("Event: " + event.name);
// var pDateTime = $("<p>").text("Date and Time: " + event.dateTime);
// var pVenue = $("<p>").text("Venue: " + event.venue);
// var pAddress = $("<p>").text("Address: " + event.address);
// var pTix = $("<p>").text("Tickets: " + event.tickets);


// newDiv.prepend(pEvent, pDateTime, pVenue, pAddress, pTix);
// $("#result").append(newDiv);
// console.log(event);