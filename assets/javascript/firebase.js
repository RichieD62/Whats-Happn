// Initialize Firebase
var config = {
  apiKey: "AIzaSyCJG6RWwpogdO5GjSNb6NZqRi3FYASmNu0",
  authDomain: "project-1-1540863867744.firebaseapp.com",
  databaseURL: "https://project-1-1540863867744.firebaseio.com/",
  projectId: "project-1-1540863867744",
  storageBucket: "",
  messagingSenderId: "602696685446"
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function (user) {
  if (user != null) {
    console.log('user logged in')
    // User is signed in.
    $("#login-div").css("display", "none")
    $("#create-user-div").css("display", "none")
    $("#user-div").css("display", "block")

    var user = firebase.auth().currentuser;

    var email_id = user.email
    var welcome_message = $("welcome-msg").html("<h3>")
    $(welcome_message).text("Welcome," + email_id + "let's see what's happ'n")

  } else {
    console.log('user not logged in')
    // No user is signed in.
    $("#create-user-div").css("display", "none")
    $("#user-div").css("display", "none")
    $("#login-div").css("display", "block")

    newUserModal()
  }
});

function login() {
  var email = $("#email").val();
  var password = $("#password").val();


  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    console.log("Error: " + errorMessage + "(" + errorCode + ")")
    // ...
  });

  $("#email").html('');
  $("#password").html('');
}


function newUser() {
  var email = $("#email").val();
  var password = $("#password").val();


  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    console.log("Error: " + errorMessage + "(" + errorCode + ")")
    // ...
  });

}

function logout() {
  firebase.auth().signOut().then(function () {

    $("#email").html('');
    $("#password").html('');
    // Sign-out successful.
  }).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    // An error happened.
    console.log("Error: " + errorMessage + "(" + errorCode + ")")
  });
}

// When the user clicks the button, open the modal 
function newUserModal() {
  var modal = $("#create-user-div")

  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  $("#create-user").on("click", function () {
    $(modal).css("display", "block")
    $("#login-div").css("display", "none")

  })

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    $(modal).css("display", "none");
    $("#login-div").css("display", "block")
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      $(modal).css("display", "none");
      $("#login-div").css("display", "block")

    }
  }
}
