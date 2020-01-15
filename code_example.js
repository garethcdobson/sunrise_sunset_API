const axios = require('axios');

let results = [];
let promises = [];
let latArray = [];
let longArray = [];

function randomNumberBetween(from, to) {
     return (Math.random() * (to - from) + from).toFixed(7);
}

// Generate 10 random co-ordinates and output API GET request results for each set
for (i=0; i<10; i++) {
     let lat = randomNumberBetween(-90, 90);
     let long = randomNumberBetween(-180, 180);

     promises.push(
          axios.get('https://api.sunrise-sunset.org/json?', {
               params: {
                    lat: lat,
                    lng: long,
                    formatted: 1,
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
          console.log("Latitudes:")
          console.log(longArray);
          console.log(results);
     }).catch(error => {
          console.log(error);
     }
);