// save the user's profile into Firebase so we can list users,
// use them in Security and Firebase Rules, and show profiles

var addFavorite = null

firebase.auth().onAuthStateChanged(function (user) {
    console.log("user: " + user)
    // if (user != null) {
    // firebase.database().ref('users/' + ).set({
    //     userId: firebase.auth().currentUser.uid,
    //     favorties: addFavorite
    // })
    // }
})

function addFavorites() {
    $(".favorite").on("click", function () {
        addFavorite = $(this).parent().parent()
        console.log(addFavorite)

        return addFavorite
    })
}
function logout() {
    firebase.auth().signOut()
}

$("#myBtn2").on("click", logout())