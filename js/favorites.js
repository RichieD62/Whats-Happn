// save the user's profile into Firebase so we can list users,
// use them in Security and Firebase Rules, and show profiles

var addFavorite = null

var user = firebase.auth().currentUser;
var userId = firebase.auth().currentUser.uid;

firebase.auth().onAuthStateChanged(function (user, userId) {
    console.log("Firebase.auth().currentUser: " + firebase.auth().currentUser)
    

    console.log("user: " + user)
    // if (user != null) {
    firebase.database().ref('users/' + userId).set({
        userId: firebase.auth().currentUser.uid,
        favorties: addFavorite
    })
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