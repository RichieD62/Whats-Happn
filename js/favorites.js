// save the user's profile into Firebase so we can list users,
// use them in Security and Firebase Rules, and show profiles

firebase.auth().onAuthStateChanged(function () {
    var userId = firebase.auth().currentUser.uid;

    firebase.database().ref('users/' + userId).set({
        userId: userId,
        favorties: addFavorite
    })
})

function addFavorites() {
    $(".favorite").on("click", function () {
        var addFavorite = $(this).parent().parent()
        console.log(addFavorite)

        return addFavorite
    })
}
function logout() {
    firebase.auth().signOut()
}

$("#myBtn2").on("click", logout())