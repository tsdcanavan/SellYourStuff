// zipInput is the requested zip, we default the radius to 10 miles
var zipInput = "08873";
var zipArray = [];
var zipResponse = false;
var userId;
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

function addUser() {
    // add user and get the users key
    database.ref().push({
        userName: "my name",
        userEmail: "email@email.com",
        userPwd: "xxxyyy",
        userLocation: "city, state,zip"
    });

    database.ref().on('child_added', function (snapshot) {
        userId = snapshot.key;
        console.log(userId);
    });
}

function addUser(loginName) {
    // login user and get the users key
    database.ref().on('value', function (snapshot) {
        if (userName === loginName) {
            userId = snapshot.key;
            loginSuccess = true;
            return
        }
    });
    if (userId === "") {
        loginSuccess = false;
    }
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
