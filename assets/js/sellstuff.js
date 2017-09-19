// zipInput is the requested zip, we default the radius to 10 miles
var zipInput = "08873";
var zipArray = [];
var zipResponse = false;
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

// function addUser(loginEmail, zipCode, password) {
//     // login user and get the users key
//     database.ref().on('child_added', function (snapshot) {
//         if (userEmail === loginEmail) {
//             userId = snapshot.key;
//             loginSuccess = false;
//             return loginSuccess;
//         }
//     });
//     var request = "https://www.zipcodeapi.com/rest/" +
//         "js-wAyUdNRpP6Np73vS03R6gNZ4yl9v22jyDStRFlgvr4Uz7qs8tkeK7eOGzYcC1vbE/" +
//         "radius.json/" + zipCode + "/1/mile";
//     $.ajax({
//         url: request,
//         method: "GET"
//     }).done(function (response) {
//         for (i = 0; i < zip_codes.length; i++) {
//             if (response.zip_codes[i].distance === 0) {
//                 var apiCity = response.zip_codes[i].city;
//                 var apiState = respons.zip_codes[i].state;
//             }
//         }
//         console.log(response);
//     }
//     database.ref().push({
//             userName: "",
//             userEmail: loginEmail,
//             userPwd: password,
//             userLocation: {
//                 city: apiCity,
//                 state: apistate,
//                 zip: zipCode
//             }
//         });
//     loginSuccess = false;
// }

function addUser(loginEmail, zipCode, password, name) {
    // login user and get the users key
    var loginEmail;
    var password;
    var zipCode;
    var name;

    var request = "https://www.zipcodeapi.com/rest/" +
        "js-wAyUdNRpP6Np73vS03R6gNZ4yl9v22jyDStRFlgvr4Uz7qs8tkeK7eOGzYcC1vbE/" +
        "radius.json/" + zipCode + "/1/mile";
    $.ajax({
        url: request,
        method: "GET"
    }).done(function (response) {
        console.log(response);
        for (i = 0; i < response.zip_codes.length; i++) {
            if (response.zip_codes[i].distance === 0) {
                var apiCity = response.zip_codes[i].city;
                var apiState = response.zip_codes[i].state;
                var apiZip = response.zip_codes[i].zip_code;
                database.ref().push({
                    userName: name,
                    userEmail: loginEmail,
                    userPwd: password,
                    userLocation: {
                        city: apiCity,
                        state: apiState,
                        zip: apiZip
                    }
                });
                database.ref().on('child_added', function (snapshot) {
                    if (userEmail === loginEmail) {
                        userId = snapshot.key;
                        return userId;
                    }
                });

            }
        }
    });
}

function addItem(userId) {
    // add an item to the user's account and get the item's key
    database.ref(userId).push({
        itemName: "chair",
        itemDesc: "sitdown",
        itemQty: 2,
        itemPrice: 85.00,
        itemTags: "tagger1, tagger2, tagger3",
        itemImg: "url infor"
    });
    database.ref(userId).on('child_added', function (snapshot) {
        itemId = snapshot.key;
        console.log(itemId);
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


    //function to capture user Login in case we need it elsewhere
    function logIn() {
        userEmail = $(".user-email").val().trim();
        console.log("userEmail ", userEmail);
        userPwd = $(".user-pw").val().trim();
        console.log("userPwd ", userPwd);
    }

}


function zipLookupTest() {
    // testing zip lookup - currently not called anywhere
    if (zipInput === "") {
        zipInput = "08873";
    }

    console.log(zipInput.length);
    if (zipInput.length === 5) {
        // zipcodeapi.com   -   zip code api
        var request = "https://www.zipcodeapi.com/rest/" +
            "js-wAyUdNRpP6Np73vS03R6gNZ4yl9v22jyDStRFlgvr4Uz7qs8tkeK7eOGzYcC1vbE/" +
            "radius.json/" + zipInput + "/10/mile";
        console.log(request);
        console.log(zipInput);
        $.ajax({
            url: request,
            method: "GET"
        }).done(function (response) {
            if (response.zip_codes.length === 0) {
                alert("failed zip lookup");
                zipResponse = false;
            } else {
                zipResponse = true;
                console.log(response);
                for (i = 0; i < response.zip_codes.length; i++) {
                    zipArray[i] = response.zip_codes[i].zip_code;
                }
                database.ref().on("value", function (snapshot) {
                    console.log("inside firebase read");
                });
            }
        });
    }
    if (zipResponse === false || zipInput.length != 5) {
        //search itemName, itemDesc, itemTags
    }
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
        addHtml.attr("class","float-center");
        addHtml.text(locationName + "  Temp (F): " + temp + "   Cond: " + condition);
        console.log(addHtml);
        console.log(temp + " " + locationName + " " + condition);
        $("#weather").empty();
        $("#weather").append(addHtml);
    });
});
}


initFirebase();

getWeather();


//onClick #regSend should trigger this function
$('#regSend').on('click', function () {
    register();
    //I am placing my user login here to replace yours
    var registered = true;
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPwd).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        registered = false;
        // ...
    });
    if (registered === true) {
        userId = firebase.auth().currentUser;
        addUser(userEmail, userName, userLocation, userId)
    }
});

//onClick #logIn should trigger this function
$('#logIn').on('click', function () {
    logIn();
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
});

//onclick signout
function signOut() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });
}


function getRadius() {
if (zipInput === "") {
    zipInput = "08873";
}

console.log(zipInput.length);
if (zipInput.length === 5) {
    // zipcodeapi.com   -   zip code api
    var request = "https://www.zipcodeapi.com/rest/" +
        "js-wAyUdNRpP6Np73vS03R6gNZ4yl9v22jyDStRFlgvr4Uz7qs8tkeK7eOGzYcC1vbE/" +
        "radius.json/" + zipInput + "/10/mile";
    console.log(request);
    console.log(zipInput);
    $.ajax({
        url: request,
        method: "GET"
    }).done(function (response) {
        if (response.zip_codes.length === 0) {
            alert("failed zip lookup");
            zipResponse = false;
        } else {
            zipResponse = true;
            console.log(response);
            for (i = 0; i < response.zip_codes.length; i++) {
                zipArray[i] = response.zip_codes[i].zip_code;
            }
            database.ref().on("value", function (snapshot) {
                console.log("inside firebase read");
            });
        }
    });
}
if (zipResponse === false || zipInput.length != 5) {
    //search itemName, itemDesc, itemTags
}
}