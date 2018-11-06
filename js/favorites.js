// save the user's profile into Firebase so we can list users,
// use them in Security and Firebase Rules, and show profiles
function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
      username: name,
      email: email
    });
  }

  //Get the current userID
var userId = firebase.auth().currentUser.uid;
//Get the user data
return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
    //Do something with your user data located in snapshot
});

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