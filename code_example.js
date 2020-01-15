const axios = require('axios');

console.log("Sennen Tech Code Task (Node.js App)");

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
     for (var i = 1; i < array.length; i++) {
          if (array[i] < array[lowest]) lowest = i;
     }
     return lowest;
}

// Find and output results associated with the earliest sunrise from generated co-ordinates
function findEarlySunrise() {
     let sunriseList = [];
     results.forEach(({ sunrise }) => sunriseList.push(Date.parse(sunrise)));
     console.log("Earliest sunrise at co-ordinates with index: " + indexOfSmallest(sunriseList))
     // Remember that index includes 0 at first position
     console.log(results[indexOfSmallest(sunriseList)]);
};

console.log("Running staggered API requests, please wait...");

// Generate 50 random co-ordinates and output API GET request results for each set
for (var i=0; i<50; i++) {
     // Removing extreme latitude bands where daylight / night can last for 24 hours
     let lat = randomNumberBetween(-70, 70);
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
               (1000 * i)
          )
     );
     promises.push(promise);
};

Promise.all(promises).then(() => {
          console.log("Number of results returned: " + results.length);
          console.log("Latitudes:")
          console.log(latArray);
          console.log("Longitudes:")
          console.log(longArray);
     }).then(() => {
          findEarlySunrise();
     }).catch(error => {
          console.log(error);
     }
);