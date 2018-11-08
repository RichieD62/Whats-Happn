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
    return user
})

function addFavorites(user) {
    $("#result").on("click", ".favorite", function () {
        var addFavorite = $(this).parent().parent().parent()
        console.log(addFavorite)
        var userId = user.uid

        favorites.push(addFavorite)
        firebase.database().ref('users/' + userId).set({
            favorties: favorites
        })
        // firebase.database().push
        // return addFavorite
    })
}

$(document).ready(function (user) {
    addFavorites(user)
})


function logout() {
    firebase.auth().signOut()
}

$("#myBtn2").on("click", logout())