// Initialize Firebase
var config = {
    apiKey: "AIzaSyCJG6RWwpogdO5GjSNb6NZqRi3FYASmNu0",
    authDomain: "project-1-1540863867744.firebaseapp.com",
    databaseURL: "https://project-1-1540863867744.firebaseio.com",
    projectId: "project-1-1540863867744",
    storageBucket: "project-1-1540863867744.appspot.com",
    messagingSenderId: "602696685446"
  };
  firebase.initializeApp(config);
  
  database = firebase.database();
  
  firebase.auth().onAuthStateChanged(function (user) {
    if (user != null) {
      $(".edit").attr("class", "mt-2 ml-1 mr-1 btn btn-primary btn-sm active edit border-top")
      $(".delete").attr("class", "mt-2 ml-1 mr-1 btn btn-primary btn-sm active delete border-top")
  
    }
  })

  $(document).ready(function () {

    var modal = $("#myModal")

    var button = $("#myBtn")

    // Get the <span> element that closes the modal
    var span = $(".close")[0];

    // When the user clicks the button, open the modal 
    $(button).on("click", function () {
        console.log("foo")
        $(modal).css("display", "block");
    })

    $(span).on("click", function () {
        $(modal).css("display", "none")
    })
})

// Initialize the FirebaseUI Widget using Firebase.
var firebaseui = new firebaseui.auth.AuthUI(firebase.auth());

firebaseui.start('#firebaseui-auth-container', {
    signInOptions: [
        // List of OAuth providers supported.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID
    ]
});

var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '/whats-happn/index.html',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '#',
    // Privacy policy url.
    privacyPolicyUrl: '#'
};

// The start method will wait until the DOM is loaded.
firebaseui.start('#firebaseui-auth-container', uiConfig);