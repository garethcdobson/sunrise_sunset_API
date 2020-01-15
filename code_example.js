const axios = require('axios');

console.log("Sennen Tech Code Task\nGenerating 100 random co-ordinates and finding the earliest sunrise (UTC Time)");

let results = [];
let promises = [];
let latArray = [];
let longArray = [];

function randomNumberBetween(from, to) {
     return (Math.random() * (to - from) + from).toFixed(7);
};

// Return index of the smallest value in an array
function indexOfSmallest(array) {
     var lowest = 0;
     for (var i=1; i<array.length; i++) {
          if (array[i]<array[lowest]) lowest = i;
     }
     return lowest;
};

function convertTime(stringFormat){
     var time = new Date(stringFormat).toUTCString();
     return time;
}

// Find and output results associated with the earliest sunrise from generated co-ordinates
function findEarlySunrise() {
     let sunriseList = [];

     results.forEach(({ sunrise }) => sunriseList.push(Date.parse(sunrise)));
     var result = results[indexOfSmallest(sunriseList)];

     console.log("Earliest sunrise is found at: " + latArray[indexOfSmallest(sunriseList)] + ", " + longArray[indexOfSmallest(sunriseList)] + ".");
     console.log("Sunrise is at: " + convertTime(result.sunrise) + ".");

     var day_length = Math.round((result.day_length / 3600) * 10) / 10;
     console.log("Day is " + day_length + " hours long at these co-ordinates.");

     console.log(result);
};

console.log("Running staggered API requests, please wait...");

// Generate 100 random co-ordinates and output API GET request results for each set (data requested based on default of current date)
for (var i=0; i<100; i++) {
     // Removing extreme latitude bands where daylight / night can last for 24 hours
     let lat = randomNumberBetween(-60, 60);
     let long = randomNumberBetween(-180, 180);
     // Create promises and add to promises array
     let promise = new Promise((resolve, reject) =>
          setTimeout(() => {
               return axios.get('https://api.sunrise-sunset.org/json?', {
                    params: {
                         lat: lat,
                         lng: long,
                         formatted: 0,
                    }
               }).then(response => {
                    resolve(results.push(response.data.results));
               }).then(() => {
                    latArray.push(lat);
                    longArray.push(long);
               }).catch(
                    error => reject(error)
               )},
               // Multiply delay by index to ensure timeouts are staggered
               (500 * i)
          )
     );
     promises.push(promise);
};

Promise.all(promises).then(() => {
          console.log("Number of results returned: " + results.length);
     }).then(() => {
          findEarlySunrise();
     }).catch(error => {
          console.log(error);
     }
);