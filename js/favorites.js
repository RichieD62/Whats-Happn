// save the user's profile into Firebase so we can list users,
// use them in Security and Firebase Rules, and show profiles

var userId = ''
var favorites = []
var user = firebase.auth().currentuser;

firebase.auth().onAuthStateChanged(function (user) {
    console.dir(user)
    // if (user != null) {
    if (user) {
        console.log(user)
        firebase.database().ref('users/' + user.uid).set({
            userId: user.uid,
            favorties: favorites
        })
        addFavorites(user)
        
    }
});


function addFavorites(user) {
// function addFavorites() {
    $("#result").on("click", ".favorite", function () {
        console.log("foo")
        var card = $(this).parent().parent().parent()
        var addFavorite = {
            name: $(card).attr("name"),
            source: $(card).attr("origin"),
            id: $(card).attr("eventCode")
        }

        console.log(addFavorite)
        userId = user.uid

        favorites.push(addFavorite)
        firebase.database().ref('users/' + userId).set({
        // firebase.database().ref('users/foo').set({

            favorites: favorites
        })
        
        return addFavorite
    })
}

$(addFavorites)

function logout() {
    firebase.auth().signOut()
}

$("#myBtn2").on("click", logout())

// Loop through users in order with the forEach() method. The callback
// provided to forEach() will be called synchronously with a DataSnapshot
// for each child:
// var query = firebase.database().ref("users/foo/favorites").orderByKey();
var query = firebase.database().ref("users/" + userId + "/favorites").orderByKey();
query.on("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        var key = childSnapshot.key;
        var childData = childSnapshot.val();

        if (childData.source === "Seatgeek") {
            var id = childData.id
            var queryURL = "https://api.seatgeek.com/2/events/" + id + "?client_id=MTM3MzQ5ODJ8MTU0MTAzNTk1NC4z&client_secret=bafaccd7c9def60e73e3d2fcfcca15297124b926e7f941a51303a63dc998c0f3&";
            
            console.log(queryURL)
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {

                var events = {
                    id: response.id,
                    name: response.title,
                    dateTime: response.datetime_local,
                    venue: response.venue.name,
                    address: response.venue.address,
                    tickets: response.url
                };

                console.log(events)
                seatGeekCardGenerator(events)
            })
        } else {
            var id = childData.id
            var queryURL = "https://www.eventbriteapi.com/v3/events/" + id + "/?token=LTIANDPJGDKZMQDL556K"
            console.log(queryURL)
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {

                var events = {
                    id: response.id,
                    name: response.name.text,
                    dateTime: response.start.local,
                    tickets: response.url,
                    logo: response.logo.url,
                    venue: response.venue,
                    name: response.name.text,
                    description: response.description.text,
                    startTime: response.start.local
                };

                console.log(events)
                eventbriteCardGenerator(events)
            })
        }

    });
});

function seatGeekCardGenerator(event) {
    let HTMLTemplate = ''

    HTMLTemplate += `
    <div class="col-md-4 mt-4 mr-0">
         <div class="card" origin="Seatgeek" eventCode=${event.id} name=${event.name}>
              <div class="card-body">
                   <img class="img-fluid pl-4 ml-4 mb-2" src="https://via.placeholder.com/200"> 
              </div>
              <div class="card-body">
                   <div class="card-text">
                        <h2 class="text-center card-title">${event.name}</h2>
                        <p class="lead text-info">Event Information:</p>
                        <p>${event.venue}...</p>
                        <span class="badge badge-primary">Date & Time: ${event.dateTime}</span>
                        <a href="${event.tickets}" target="_blank" class="btn btn-primary btn-block mt-4">Get Tickets</a>                        
                   </div>
              </div>
         </div>
    </div>
`;
    $("#favoritesSection").prepend(HTMLTemplate)
}

function eventbriteCardGenerator(event) {
    let HTMLTemplate = ''
    HTMLTemplate += `
    <div class="col-md-4 mt-4 mr-0">
        <div class="card" origin="Eventbrite" eventCode=${event.id} name=${event.name}>
                <div class="card-body">
                    <img class="img-fluid mb-2" src="${event.logo !== null ? event.logo : ''}"> 
                </div>
                <div class="card-body">
                    <div class="card-text">
                        <h2 class="text-center card-title">${event.name}</h2>
                        <p class="lead text-info">Event Information:</p>
                        <p>${event.description.substring(0, 200)}...</p>
                        <span class="badge badge-primary">Date & Time: ${event.startTime}</span>
                        <a href="${event.url}" target="_blank" class="btn btn-primary btn-block mt-4">Get Tickets</a>
                    </div>
                </div>
        </div>
    </div>
    
    `;
    $("#favoritesSection").prepend(HTMLTemplate)
};