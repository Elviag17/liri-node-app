require("dotenv").config();

var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var action = process.argv[2];

var nodeArgs = process.argv;
var userInput = "";

for (var i = 3; i < nodeArgs.length; i++) {
  if (i > 3 && i < nodeArgs.length) {
    userInput = userInput + "+" + nodeArgs[i];
  } else {
    userInput += nodeArgs[i];
  }
}

function concertThis() {
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        userInput +
        "/events?app_id=codingbootcamp%22"
    )
    .then(function(response) {
      // If the axios was successful...
      // Then log the body from the site!

      var data = response.data;

      for (i = 0; i < data.length; i++) {
        console.log("Venue: " + data[i].venue.name);
        console.log("Country: " + data[i].venue.country);
        console.log("City: " + data[i].venue.city);
        console.log(moment(data[i].datetime).format("MM/DD/YYYY") + "\n");
      }
    })
    .catch(function(err) {
      console.error("Error: " + err);
    });
}

function defaultSong() {
  spotify
    .request(
      "https://api.spotify.com/v1/search?q=the+sign&artist:ace+of+base&type=track"
    )
    .then(function(response) {
      //Artist name
      console.log("Artist: " + response.tracks.items[7].album.artists[0].name);

      //Song name
      console.log("Song Name: " + response.tracks.items[7].name);

      //Song preview
      console.log("Preview link: " + response.tracks.items[7].preview_url);

      //Album name
      console.log("Album: " + response.tracks.items[7].album.name + "\n");
    })
    .catch(function(err) {
      console.error("Error: " + err);
    });
}

function spotifyFunc() {
  spotify
    .request("https://api.spotify.com/v1/search?q=" + userInput + "&type=track")
    .then(function(response) {
      if (response.tracks.items[0].name) {
        for (i = 0; i < response.tracks.items.length; i++) {
          //Artist name
          console.log(
            "Artist: " + response.tracks.items[i].album.artists[0].name
          );

          //Song name
          console.log("Song Name: " + response.tracks.items[i].name);

          //Song preview
          console.log("Preview link: " + response.tracks.items[i].preview_url);

          //Album name
          console.log("Album: " + response.tracks.items[i].album.name + "\n");
        }
      }
    })
    .catch(function(err) {
      defaultSong();
    });
}

function mrNobody() {
  axios
    .get("http://www.omdbapi.com/?apikey=trilogy&t=Mr.Nobody")
    .then(function(response) {
      // If the axios was successful...
      // Then log the body from the site!
      var data = response.data;
      console.log("Title: " + data.Title);
      console.log("Year: " + data.Year);
      console.log("Rated: " + data.Rated);
      console.log("Rotten Tomato Rating: " + data.Ratings[1].Value);
      console.log("Country: " + data.Country);
      console.log("Language: " + data.Language);
      console.log("Plot: " + data.Plot);
      console.log("Actors: " + data.Actors);
    })
    .catch(function(err) {
      console.log("Error: " + err);
    });
}

function movieThis() {
  axios
    .get("http://www.omdbapi.com/?apikey=trilogy&t=" + userInput)
    .then(function(response) {
      // If the axios was successful...
      // Then log the body from the site!
      var data = response.data;
      if (data.Title) {
        console.log("Title: " + data.Title);
        console.log("Year: " + data.Year);
        console.log("Rated: " + data.Rated);
        console.log("Rotten Tomato Rating: " + data.Ratings[1].Value);
        console.log("Country: " + data.Country);
        console.log("Language: " + data.Language);
        console.log("Plot: " + data.Plot);
        console.log("Actors: " + data.Actors);
      } else {
        mrNobody();
      }
    })
    .catch(function(err) {
      console.log("Error: " + err);
    });
}

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
    var dataArr = data.split(",");
    var funcs = dataArr[0];
    var input = dataArr[1];

    if (funcs === "concert-this") {
      userInput = input;
      concertThis();
    } else if (funcs === "spotify-this-song") {
      userInput = input;
      spotifyFunc();
    } else if (funcs === "movie-this") {
      userInput = input;

      movieThis();
    } else if (funcs === "do-what-it-says") {
      userInput = input;

      doWhatItSays();
    } else {
      console.log("error");
    }
  });
}

function actions() {
  if (action === "concert-this") {
    concertThis();
  } else if (action === "spotify-this-song") {
    spotifyFunc();
  } else if (action === "movie-this") {
    movieThis();
  } else if (action === "do-what-it-says") {
    doWhatItSays();
  } else {
    console.log("error");
  }
}

actions();
