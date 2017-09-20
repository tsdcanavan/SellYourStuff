//function list
// function initFirebase() {
// function loginUser(loginEmail) {
// function addUser(loginEmail, name, zipCode, uid) { 
// function addItem(itmName, itmDesc, itmCat, itmPrice, itmQty, itmTag) {
// function register() {
// function logIn() {
// function getWeather() {
// function listSearchItems(userId, itemId) {
// function itemSearch(searchString) {
// function zipSearch(zipInput) {
// $(document).ready(function () {

// zipInput is the requested zip, we default the radius to 10 miles
var zipInput;
var zipArray = [];
var userId;
var database;

var userEmail;
var userName;
var userPwd;
var userLocation;
var searchInput;
var itmName;
var itmDesc;
var itmPrice = 0;
var itmQty = 0;
var itmTag;
var itmCat;
var itmImage;
var itmForm;

function initFirebase() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAcRiiCDBcNgsBJA-ZQYa3jCNWh9u1YbNY",
        authDomain: "sellyourstuff-d04db.firebaseapp.com",
        databaseURL: "https://sellyourstuff-d04db.firebaseio.com",
        projectId: "sellyourstuff-d04db",
        storageBucket: "sellyourstuff-d04db.appspot.com",
        messagingSenderId: "37415365376"
    };
    firebase.initializeApp(config);

    // Get a reference to the database service
    database = firebase.database();

}





function loginUser(loginEmail) {
    //find the user
    database.ref().on('child_added', function (snapshot) {
        if (userEmail === loginEmail) {
            userId = snapshot.key;
            loginSuccess = true;
            return loginSuccess, userId;
        }
    });
    // login fail, the user didn't exist
    loginSuccess = false;
    return loginSucess, "0";
}


function addUser(loginEmail, name, zipCode, uid) {
    // login user and get the users key
    var loginEmail;
    var uid;
    var zipCode;
    var name;

    console.log("uid ", uid);

    var request = "https://www.zipcodeapi.com/rest/" +
        "js-wAyUdNRpP6Np73vS03R6gNZ4yl9v22jyDStRFlgvr4Uz7qs8tkeK7eOGzYcC1vbE/" +
        "radius.json/" + zipCode + "/1/mile";
    $.ajax({
        url: request,
        method: "GET"
    }).done(function (response) {
        console.log("response ", response);
        console.log("zip_codes ", response.zip_codes);
        apiCity = "Default";
        apiState = "XX";
        apiZip = "00000";

        if (response.zip_codes != null) {
            for (i = 0; i < response.zip_codes.length; i++) {
                if (response.zip_codes[i].distance === 0) {
                    var apiCity = response.zip_codes[i].city;
                    var apiState = response.zip_codes[i].state;
                    var apiZip = response.zip_codes[i].zip_code;
                }
            }
        }
        database.ref(uid).set({
            userName: name,
            userEmail: loginEmail,
            userLocation: {
                city: apiCity,
                state: apiState,
                zip: apiZip
            }
        });
    });
}

function addItem(itmName, itmDesc, itmCat, itmPrice, itmQty, itmTag) {
    var itmName;
    var itmDesc;
    var itmCat;
    var itmPrice;
    var itmQty;
    var itmTag;
    // add an item to the user's account and get the item's key
    database.ref(userId).push({
        itemName: itmName,
        itemDesc: itmDesc,
        itemCat: itmCat,
        itemQty: itmQty,
        itemPrice: itmPrice,
        itemTag: itmTag,
        itemImg: "image info - future use"
    });
    database.ref(userId).on('child_added', function (snapshot) {
        itemId = snapshot.key;
        console.log(itemId);
        listSearchItems(userId, itemId);
    });

}

function register() {
    //capturing registration inputs(console logged and working)
    userEmail = $("#user-email").val().trim();
    console.log("userEmail ", userEmail);
    userName = $("#reg2Input").val().trim();
    console.log("userName ", userName);
    userPwd = $("#user-pw").val().trim();
    console.log("userPwd ", userPwd);
    userLocation = $("#zipInput").val().trim();
    console.log("userLocation ", userLocation);

}
//function to capture user Login in case we need it elsewhere
function logIn() {
    userEmail = $(".user-email").val().trim();
    console.log("userEmail ", userEmail);
    userPwd = $(".user-pw").val().trim();
    console.log("userPwd ", userPwd);
}

function getWeather() {
    // get the location
    var queryURL = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAHXdoX0zZXjF3zQaTbFf8FTV3X97aaGX8"

    $.ajax({
        url: queryURL,
        method: "POST"
    }).done(function (response) {
        // var lat = Math.floor(response.location.lat);
        // var lng = Math.floor(response.location.lng);
        var lat = response.location.lat;
        var lng = response.location.lng;
        console.log(response);
        console.log("lat:" + lat);
        console.log("lon:" + lng);
        //get the weather based on the location
        queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" +
            lat +
            "&lon=" + lng +
            "&units=imperial" +
            "&APIkey=9a07a10b9ee1e1a8299da42a5c0c8e07";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            console.log(response);
            var temp = response.main.temp;
            var locationName = response.name;
            var condition = response.weather[0].description
            var addHtml = $("<p>");
            addHtml.attr("class", "float-center");
            addHtml.text(locationName + " Temp: " + temp + "(F)   Cond: " + condition);
            console.log(addHtml);
            console.log(temp + " " + locationName + " " + condition);
            $("#weather").empty();
            $("#weather").append(addHtml);
        });
    });
}

function listSearchItems(userId, itemId) {
    $("#preview").empty();

    //add table
     var tableHtml = $("<table>");
     tableHtml.attr("id", "new-table");
     tableHtml.attr("class", "table");
     $("#preview").append(tableHtml);
 
     // add header
     var tableHtml = $("<thead>");
     tableHtml.html("<tr><th>Item</th><th>Item Desc</th>" +
         "<th>Item Price</th><th>Item Category</th><th>Contact<br>Seller</th></tr>");
     tableHtml.attr("id", "new-header");
     $("#new-table").append(tableHtml);

         // add body
    var tableHtml = $("<tbody>");
    tableHtml.attr("class", "body");
    tableHtml.attr("id", "new-body");
    $("#new-table").append(tableHtml);

    database.ref(userId).on("child_added", function (snapshot) {
        var sv = snapshot.val();
        var nextTrain = 0;
console.log(sv);
        // var dspTrainMin = moment().subtract(sv.trainFirst, "hh:mm").format("hh:mm");
        // console.log(moment(dspTrainMin, "X").format("hh:mm"));
        // nextTrain = (((moment().subtract(sv.trainFirst, "hh:mm"))%sv.trainFreq));
        // nextTrain = sv.trainFreq - nextTrain;
    
        // add rows
        var updHtml = $("<tr>");
        // updHtml.html("<td>" + sv.trainName + "</td><td>" +
        //     sv.trainDest + "</td><td>" + moment(sv.trainFirst,"hh:mm").format("hh:mm A") +
        //     "</td><td>" + sv.trainFreq + "</td><td>" +
        //     nextTrain + "</td>");
        $("#new-body").append(updHtml);
    });
 
}

function itemSearch(searchString) {
    var searchString;
    console.log("searchString ", searchString);

}

function zipSearch(zipInput) {
    var zipInput;
    console.log("zipInput", zipInput);
    // zipcodeapi.com   -   zip code api
    var request = "https://www.zipcodeapi.com/rest/" +
        "js-wAyUdNRpP6Np73vS03R6gNZ4yl9v22jyDStRFlgvr4Uz7qs8tkeK7eOGzYcC1vbE/" +
        "radius.json/" + zipInput + "/10/mile";
    $.ajax({
        url: request,
        method: "GET"
    }).done(function (response) {
        console.log(response);
        if (response.zip_codes === null) {
            console.log("failed zip lookup");
        } else {
            console.log($(this).response);
            for (i = 0; i < response.zip_codes.length; i++) {
                zipArray[i] = response.zip_codes[i].zip_code;
            }
            database.ref().on("value", function (snapshot) {
                console.log("inside firebase read");
                if (zipArray.indexOf(snapshot.val().userLocation.zip) != -1) {
                    console.log(snapshot.val());
                }
            });
        }
    });

}

$(document).ready(function () {
    initFirebase();
    getWeather();

});

//onClick #regSend should trigger this function
$('#regSend').on('click', function () {
    register();

    firebase.auth().createUserWithEmailAndPassword(userEmail, userPwd).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + ": " + errorMessage);
        // ...
    });

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            userId = user.uid;
            // ...
        }
    });


    //     var userId = firebase.auth().currentUser.uid;
    //  console.log("userId ", userId);
    //  var currUser = firebase.auth().currentUser;
    //  console.log("currUser ", currUser);
    setTimeout(function () {
        console.log(userId);
        if (userId != null) {
            addUser(userEmail, userName, userLocation, userId);
            $('#userConfirmedDiv').attr('class', 'grid-x');
            $('#landing').attr('class', 'grid-x reveal');
            $('#login').attr('class', 'login grid-x reveal');
            $('#logOut').attr('class', '');
        }
        else {
            alert('inputs are needed to register!')
        }
    }, 1000);
});


//onClick #logIn should trigger this function
$('#logIn').on('click', function () {
    logIn();
    firebase.auth().signInWithEmailAndPassword(userEmail, userPwd).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            userId = user.uid;
            $('#userConfirmedDiv').attr('class', 'grid-x');
            $('#landing').attr('class', 'grid-x reveal');
            $('#login').attr('class', 'login grid-x reveal');
            $('#logOut').attr('class', '');
            // ...
        }
    });
});

//onclick signout
$('#logOut').on('click', function () {
    function signOut() {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            $('#userConfirmedDiv').attr('class', 'grid-x reveal');
            $('#landing').attr('class', 'grid-x');
        }).catch(function (error) {
            // An error happened.
            alert('Logout Unsuccessful. Please try again!');
        });
    }
});

//clicking search button
$('#searchBtn').on('click', function () {
    var searchString = $("#searchInput").val().trim();
    if (searchString.length === 5) {
        console.log(searchString);
        zipSearch(searchString);
    } else {
        itemSearch(searchString);
    }
});



//onClick #regSend should trigger this function
$('#itmForm').on('click', function (e) {
    e.preventDefault();
    itmName = $("#itmName").val().trim();
    itmDesc = $("#itmDesc").val().trim();
    var e = document.getElementById("itmCat");
    itmCat = e.options[e.selectedIndex].text;
    itmPrice = $("#itmPrice").val().trim();
    itmQty = $("#itmQty").val().trim();
    itmTag = $("#itmTag").val().trim();
    addItem(itmName, itmDesc, itmCat, itmPrice, itmQty, itmTag)
    itmName = $("itmName").val("");
    itmDesc = $("itmDesc").val("");
    itmCat = $("itmCat").val("");
    itmPrice = $("itmPrice").val("");
    itmQty = $("itmQty").val("");
    itmTag = $("itmTag").val("");
});
