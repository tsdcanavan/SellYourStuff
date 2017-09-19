//onDocReady
$(function() {

var userEmail;
var userName;
var userPwd;
var userLocation;
var searchInput;
var itmName;
var itmDesc;
var itmPrice = 0;
var itmTag;
var itmCat;
var itmImage;


//function to capture registration in case we need it elsewhere
function register(){
    //capturing registration inputs(console logged and working)
    userEmail = $("#user-email").val().trim();
 console.log("userEmail ", userEmail);
    userName =  $("#reg2Input").val().trim();
 console.log("userName ", userName);
    userPwd =  $("#user-pw").val().trim();
 console.log("userPwd ", userPwd);
    userLocation =  $("#zipInput").val().trim();
 console.log("userLocation ", userLocation);
    
    }

//function to capture user Login in case we need it elsewhere
function logIn (){
    userEmail = $(".user-email").val().trim();
 console.log("userEmail ", userEmail);
    userPwd =  $(".user-pw").val().trim();
 console.log("userPwd ", userPwd);
}

//onclick signout
function signOut(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });
}

//capturing from the search input
function search(){
    searchInput = ('#searchInput').val().trim();
}

//Preview table function
function previewTable(){

}

//clicking search button - moved to sellstuff.js
// $('#searchBtn').on('click', function(){
//     search();
// });



//onClick #logIn should trigger this function
$('#logIn').on('click', function(){
    logIn();
});










//creating a welcome div with column medium-large 4 and small-12
//moving the orbit to the right with column 8 on medium-large and stack on small-12
//creating the preview div and its attr(style in app.css)
































})