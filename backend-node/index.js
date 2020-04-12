const express = require('express');
var app = express()
var bodyParser = require("body-parser");

//remove x-powered-by Express header
app.disable('x-powered-by');
//create express connection and serve static files
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
//use ejs template engine
app.set('view engine', 'ejs');
//for parsing application/json
app.use(bodyParser.json());

app.use('/api/verifyEmail', require('./api/verifyEmail.js'));

app.listen(8080)
