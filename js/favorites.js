// save the user's profile into Firebase so we can list users,
// use them in Security and Firebase Rules, and show profiles

firebase.auth().onAuthStateChanged(function () {
    var userId = firebase.auth().currentUser.uid;

    firebase.database().ref('users/' + userId).set({
        username: name,
        userId: userId
    })
})

function addFavorites() {
    $(".favorite").on("click", function () {
        var addFavorite = $(this).parent().parent()
        console.log(addFavorite)
        $("#favorites").append(addFavorite)
        newFavorites = $("#favorites").html()
        console.log(newFavorites)

    })
}