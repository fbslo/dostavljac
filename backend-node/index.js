const express = require('express');
var app = express()
var bodyParser = require("body-parser");
require('dotenv').config();
const fileUpload = require('express-fileupload');
var cookies = require("cookie-parser");
//allow cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); //remove in production
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type');
  next();
});
//connect to database
var con = require('./database/database.js')
//JSON web token
const jwt = require('jsonwebtoken');

//authentication middleware
var middleware = require('./middlewares.js')
var isAuth = middleware.authenticateRoute

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
app.use(cookies())

//serve all frontend files
app.use('/', require('./routes/frontend.js'))
//Login route
app.use('/login', require('./routes/login.js'));
//send verification email using Sendgrid's API
app.use('/api/sendVerificationEmail', require('./api/sendVerificationEmail.js'));
//verify email when user clicks the link in email
app.use('/api/verifyEmail', require('./api/verifyEmail.js'));
//Know your customer, ID verification photo upload
app.use('/api/kyc', require('./api/kyc.js'));
//registration of new users
app.use('/api/register', require('./api/register.js'));
//kraji & poštne številke v Sloveniji
app.use('/api/kraji', require('./api/kraji.js'))
//user details
app.use('/api/userStatus', isAuth, require('./api/userStatus.js'))
//reset user's password
app.use('/api/resetPassword', require('./api/resetPassword.js'))
//change user's password
app.use('/api/changePassword', isAuth, require('./api/changePassword.js'))

app.listen(8080)
