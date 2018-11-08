// save the user's profile into Firebase so we can list users,
// use them in Security and Firebase Rules, and show profiles

var favorites = []

firebase.auth().onAuthStateChanged(function (user) {
    console.dir(user)
    // if (user != null) {
    if (user) {
        firebase.database().ref('users/' + user.uid).set({
            userId: user.uid,
            favorties: favorites
        })
    }
    // }
})

function addFavorites() {
    $("#result").on("click", ".favorite", function () {
        var addFavorite = $(this).parent().parent()
        console.log(addFavorite)
        var user_id = firebase.auth().currentUser.uid

        favorites.push(addFavorite)
        firebase.database().ref('users/' + user_id).set({
            favorties: favorites
        })
        // firebase.database().push
        // return addFavorite
    })
}

$(document).ready(function () {
    addFavorites()
})


function logout() {
    firebase.auth().signOut()
}

$("#myBtn2").on("click", logout())