const express = require('express')
var router = express.Router()
//get database connection
var con = require('../database/database.js')
const sgMail = require('@sendgrid/mail');

//password hashing
const bcrypt = require('bcrypt-nodejs');
const saltRounds = 10;

router.post('/', (req, res) => {
  var token = req.cookies["id"];
  jwt.verify(token, sign, function (err, decoded) {
    cookie = decoded
  })
  var email = cookie.email
  var new_password = req.body.new_password
  var password = req.body.password
  if(!email || !new_password || !password) res.status(400).json({ message: "Missing credentials!" })
  else {
    con.query('SELECT * FROM users WHERE email=?;', email, (err, result) => {
      if(err) res.status(500).json({ message: 'Internal Server Error!' });
      else {
        if(!result || result.length == '0') res.status(400).json({ message: 'No such user found!' });
        else {
          var password_db = result[0].password
          if(password == password_db){
            bcrypt.genSalt(saltRounds, function(err, salt) {
              bcrypt.hash(password, salt, null, async function(err, hash) {
                con.query('UPDATE users SET password = ? WHERE email = ?', [hash, email], (err, result) => {
                  if(err) {
                    console.log('Error updating password!')
                    res.status(500).json({ message: 'Updating password failed!' });
                  }
                  if(result){
                    res.status(200).json({ message: 'Password changed!' });
                    console.log("Password updated! Email: "+email)
                  }
                })
              })
            })
          } else {
            res.status(400).json({ message: 'Old password is not correct!' });
          }
        }
      }
    })
  }
})

module.exports = router;
