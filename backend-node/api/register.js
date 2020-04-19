const express = require('express')
var router = express.Router()
//get database connection
var con = require('../database/database.js')
var request = require('request')

//password hashing
const bcrypt = require('bcrypt-nodejs');
const saltRounds = 10;

router.post('/', (req, res) => {
  var name = req.body.name
  var email = req.body.email
  var password = req.body.password
  var userStatus = req.body.userStatus
  var date = new Date()
  var domain = req.protocol + '://' + req.headers.host
  if(!email || !password || !validateEmail(email) || !name || !userStatus){
    res.status(400).json({ message: "Missing credentials!" })
  } else {
    if(name.length < 5 || password.length < 10) {
      res.status(400).json({ message: "Name or password is to short!" })
    } else {
      con.query('SELECT * FROM users WHERE email=?', email, (err, result) => {
        if(!result || result.length != '0'){
          res.status(400).json({ message: "Email already exisits!" })
        } else if(err){
          res.status(500).json({ message: "Internal Server Error!" })
        } else {
          bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, null, async function(err, hash) {
              var sql = 'INSERT INTO users (name, email, password, date, verifiedEmail, userStatus) VALUES ?'
              var values = [[name, email, hash, date, 'false', userStatus]]
              con.query(sql, [values], (err, result) => {
                if(err) res.status(500).json({ message: "User not created!" })
                if(result){
                  sendVerificationEmail(domain, email)
                  res.status(200).json({ message: "User created!" })
                }
              });
            });
          });
        }
      })
    }
  }
})



function sendVerificationEmail(domain, email){
  request.post(domain+'/api/sendVerificationEmail', {
    json: {
      email: email,
      server_secret: process.env.SERVER_SECRET
    }
  }, (error, res, body) => {
    if (error) {
      console.error("Error sending verification email: "+error)
      return
    }
    console.log(body)
  })
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports = router;
