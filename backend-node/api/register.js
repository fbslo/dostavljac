const express = require('express')
var router = express.Router()
//get database connection
var con = require('../database/database.js')

//password hashing
const bcrypt = require('bcrypt-nodejs');
const saltRounds = 10;

router.post('/', (req, res) => {
  var name = req.body.name
  var email = req.body.email
  var password = req.body.password
  var date = new Date()
  if(!email || !password || !validateEmail(email) || !name){
    res.redirect('/?status=false&reason=missing')
  } else {
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(password, salt, null, function(err, hash) {
        var sql = 'INSERT INTO users (name, email, password, date, verifiedEmail) VALUES ?'
        var values = [[name, email, hash, date, 'false']]
        con.query(sql, [values], (err, result) => {
          if(err) res.send("User not created!")
          if(result) res.send("User created!")
        });
      });
    });
  }
})

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports = router;
