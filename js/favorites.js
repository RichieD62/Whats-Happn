// save the user's profile into Firebase so we can list users,
// use them in Security and Firebase Rules, and show profiles

// var favorites = []

// firebase.auth().onAuthStateChanged(function (user) {
//     console.dir(user)
//     // if (user != null) {
//     if (user) {
//         firebase.database().ref('users/' + user.uid).set({
//             userId: user.uid,
//             favorties: favorites
//         })
//         addFavorites(user)
//     }
// });


// function addFavorites(user) {
function addFavorites() {
    $("#result").on("click", ".favorite", function () {
        console.log("foo")
        var card = $(this).parent().parent().parent()
        var addFavorite = {
            name: $(card).attr("name"),
            source: $(card).attr("origin"),
            id: $(card).attr("eventCode")
        }

        console.log(addFavorite)
        // var userId = user.uid

        // favorites.push(addFavorite)
        // firebase.database().ref('users/' + userId).set({
        //     favorties: favorites
        // })
        // firebase.database().push
        // return addFavorite
    })
}

$(addFavorites)


function logout() {
    firebase.auth().signOut()
}

$("#myBtn2").on("click", logout())