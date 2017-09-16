//onDocReady
$(function() {

var userEmail;
var userName;
var userPwd;
var userLocation;
var searchInput;

//function to capture registration in case we need it elsewhere
function register(){
    //capturing registration inputs(console logged and working)
    userEmail = $("#user-email").val().trim();
    userName =  $("#reg2Input").val().trim();
    userPwd =  $("#user-pw").val().trim();
    userLocation =  $("#zipInput").val().trim();
    
    }

//function to capture user Login in case we need it elsewhere
function logIn (){
    userEmail = $(".user-email").val().trim();
 console.log("userEmail ", userEmail);
    userPwd =  $(".user-pw").val().trim();
 console.log("userPwd ", userPwd);
}

//capturing from the search input
function search(){
    searchInput = ('#searchInput').val().trim();
}

//clicking search button
('#searchBtn').on('click', function(){
    search();
});

//onClick #regSend should trigger this function
$('#regSend').on('click', function(){
    register();
});

//onClick #logIn should trigger this function
$('#logIn').on('click', function(){
    logIn();
});


































})