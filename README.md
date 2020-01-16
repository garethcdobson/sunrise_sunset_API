## Sennen Tech Code Task
### Setup & Running Script
Instructions to run script locally, npm package manager is required.  
Clone the git repo
```
git@github.com:garethcdobson/sunrise_sunset_API.git
```
Install dependencies
```
npm install
```
Run the relevant JS file using Node.js
```
node code_example.js
```
### Notes
Although I am aware of Typescript, I am far more familiar with pure Javascript and thought it would be useful to stick with it for this task, especially as I was covering some new ground in other aspects of the task. Despite having experience with axios requests, particularly with React, this was one of my first attempts at integrating API requests inside Node.js.  

I started by writing the code to generate random co-ordinates (later deciding to change the latitude range from -90-90 to -60-60 to account for the latitude bands where sunlight can persist for all 24 hours of the day). Once I had individual axios GET requests working with the API, I set about sending requests for all of the 100 generated co-ordinates. It quickly became clear that I was overloading the API and would need to do some research into how and why this works - and the best methods to deal with this. It was at this point that I began to read about API rate limiting and methods of sending batches of promises, or in my case to use setTimeout() to stagger promises, with the axios GET request, which were then resolved with a promise.all(). It took a fair amount of time on Stack Overflow and other online resources to truly understand these principles, but I am very happy that my persistence and desire to overcome the challenge paid off. 

The end result has the following features:
* Generates 100 random co-ordinates.
* Sends and receives an Axios GET request for each of the generated co-ordinates. 
* Axios requests are staged in order to avoid overloading the API server. 
* Function returns the co-ordinates of the earliest sunrise of the randomly generated co-ordinates.
* Function returns the length of daytime at the above co-ordinates.
* Function returns the average Solar Noon of the 100 randomly generated co-ordinates. 
* Attempt to use ES6/7 array features where appropriate.
* Attempt to handle errors properly.

I am not very experienced with ramda and unit tests and felt that spending the extra time ensuring that I properly understood and applied the code that I had written was more valuable. However, with more time, possibly in the future I would be very interested to learn more and experiment with these technologies / concepts. 

### Brief

Write a small example in Typescript (Javascript also acceptable) / nodejs.  

There is no right or wrong answer here and do as much or as little as you like -just wanting to get a feel for coding style and ability.  Think clean, tidy, well-structured code over features / functionality.  Good naming is also a bonus. Structure and arrange as you wish.  

Basic example:
* Using https://sunrise-sunset.org/api, fetch the sunrise / sunset times
* Generate a list of 100 random lat / long points around the world
* Run 5 requests in parrallel, run next 5 after 5 second break if they've all finished
* Find earliest sunrise and list the day length for this time

Bonus points: 
* Use ramda, implement some functional programming
* Use ES6/7 array features
* Handle errors properly
* Additional functionality
* Unit tests

