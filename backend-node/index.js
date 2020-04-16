const express = require('express');
var app = express()
var bodyParser = require("body-parser");
require('dotenv').config();
const fileUpload = require('express-fileupload');
//connect to database
var con = require('./database/database.js')
//JSON web token
const jwt = require('jsonwebtoken');

const passport = require('passport');
const passportJWT = require('passport-jwt');

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_SECRET;

// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  var sql = 'SELECT * FROM users WHERE email = ?;'
  con.query(sql, jwt_payload.id, (err, result_db) => {
    if(!result_db) console.log('Email not found!')
    else {
      let user = result_db[0].email
      if (user) {
        next(null, user);
      } else {
        next(null, false);
      }
    }
  });
});

// use the strategy
passport.use(strategy);

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
app.use('/api/kraji', passport.authenticate('jwt', { session: false }), require('./api/kraji.js'))


app.listen(8080)
