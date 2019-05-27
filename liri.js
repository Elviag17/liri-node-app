require("dotenv").config();

var axios = require("axios");
var moment = require("moment");
// var Spotify = require("node-spotify-api");

// var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);

var action = process.argv[2];

var nodeArgs = process.argv[3];
var artist = "";

for (var i = 3; i < nodeArgs.length; i++) {
  if (i > 3 && i < nodeArgs.length) {
    artist = artist + "+" + nodeArgs[i];
  } else {
    artist += nodeArgs[i];
  }
}

function concertThis() {
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        artist +
        "/events?app_id=codingbootcamp%22"
    )
    .then(function(response) {
      // If the axios was successful...
      // Then log the body from the site!

      var data = response.data;

      for (i = 0; i < data.length; i++) {
        console.log(data[i].venue.name);
        console.log(data[i].venue.country);
        console.log(data[i].venue.city);
        console.log(moment(data[i].datetime).format("MM/DD/YYYY") + "\n");
      }
    })
    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}

function bands() {
  if (action === "concert-this") {
    concertThis();
  } else {
    console.log("error");
  }
}

bands();
