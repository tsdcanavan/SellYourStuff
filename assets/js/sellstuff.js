// zipInput is the requested zip, we default the radius to 10 miles
var zipInput = "08873";
var zipArray = [];
var zipResponse = false;
var userId;
var database;

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


//I am placing my user login here to replace yours
firebase.auth().createUserWithEmailAndPassword(userEmail, userPwd).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });

function addUser() {
    // add user and get the users key
    database.ref().push({
        userName: "my name",
        userEmail: "email@email.com",
        userPwd: "xxxyyy",
        userLocation: "city, state,zip"
    });

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
}

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
                        return  userId;
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

initFirebase();


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
