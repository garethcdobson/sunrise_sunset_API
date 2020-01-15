const axios = require('axios');

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

// Generate 10 random co-ordinates and output API GET request results for each set
for (var i=0; i<10; i++) {
     // Removing extreme latitude bands where daylight / night can last for 24 hours
     let lat = randomNumberBetween(-70, 70);
     let long = randomNumberBetween(-180, 180);

     promises.push(
          axios.get('https://api.sunrise-sunset.org/json?', {
               params: {
                    lat: lat,
                    lng: long,
                    formatted: 0,
               }
          }).then(response => {
               results.push(response.data.results);
          }).then(() => {
               latArray.push(lat);
               longArray.push(long);
          }).catch(error => {
               console.log(error);
          })
     )
};

Promise.all(promises).then(() => {
          // Co-ordinates match with corresponding indices
          console.log("Latitudes:")
          console.log(latArray);
          console.log("Longitudes:")
          console.log(longArray);
          // console.log(results);
     }).then(() => {
          findEarlySunrise();
     }).catch(error => {
          console.log(error);
     }
);