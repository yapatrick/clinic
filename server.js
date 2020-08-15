//Define the http server
const http = require('http');

//Import the app.js file
const app   = require('./app');

//Create server 
const server = http.createServer(app);