const express = require('express')
var router = express.Router()
var con = require('../database/database.js')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');

const passport = require('passport');
const passportJWT = require('passport-jwt');

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_SECRET;

//POST /login
router.post('/', (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    var sql = 'SELECT * FROM users WHERE email = ?;'
    con.query(sql, email, (err, result_db) => {
      if(err){
        res.status(500).json({ message: 'Internal Server Error!' });
      }
      if(!result_db || result_db.length == '0'){
        res.status(401).json({ message: 'No such user found' });
      } else {
        if(result_db[0].verifiedEmail == 'false'){
          res.status(401).json({ message: 'Email is not verified!' });
        } else {
          var password_db = result_db[0].password
          bcrypt.compare(password, password_db, function(err, result) {
            if(result == true){
              //user's password is correct
              let payload = { id: result_db[0].email };
              let token = jwt.sign(payload, jwtOptions.secretOrKey);
              res.json({ message: 'ok', token: token });
            } else {
              res.status(401).json({ message: 'Password is not correct!' });
            }
          });
        }
      }
    })
  } else {
    res.status(401).json({ message: 'Missing credentials!' });
  }
})



module.exports = router;
