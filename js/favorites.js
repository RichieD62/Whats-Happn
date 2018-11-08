// save the user's profile into Firebase so we can list users,
// use them in Security and Firebase Rules, and show profiles

firebase.auth().onAuthStateChanged(function () {
    var userId = firebase.auth().currentUser.uid;

    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
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

        document.cookie = "gif=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        document.cookie = "gif=" + newFavorites + ";";
        readCookies(newFavorites)


    })
}