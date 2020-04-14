const express = require('express');
var app = express()
var bodyParser = require("body-parser");
require('dotenv').config();
const fileUpload = require('express-fileupload');

//file upload
app.use(fileUpload({
    limits: {
        fileSize: 5000000 //5mb limit
    },
    abortOnLimit: true
 }));
//remove x-powered-by Express header
app.disable('x-powered-by');
//create express connection and serve static files
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
//use ejs template engine
app.set('view engine', 'ejs');
//for parsing application/json
app.use(bodyParser.json());

app.use('/api/sendVerificationEmail', require('./api/sendVerificationEmail.js'));
app.use('/api/verifyEmail', require('./api/verifyEmail.js'));
//Know your customer, ID verification photo upload
app.use('/api/kyc', require('./api/kyc.js'));
//registration of new users
app.use('/api/register', require('./api/register.js'));
//kraji v Sloveniji
app.use('/api/kraji', require('./api/kraji.js'))


app.listen(8080)
