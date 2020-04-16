const express = require('express')
var router = express.Router()
var con = require('../database/database.js')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');


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
        res.status(401).json({ message: 'No such user found!' });
      } else {
        if(result_db[0].verifiedEmail == 'false'){
          res.status(401).json({ message: 'Email is not verified!' });
        } else {
          var password_db = result_db[0].password
          bcrypt.compare(password, password_db, function(err, result) {
            if(result == true){
              //crette token
              function createAuthToken(id, agent) {
                  var sign = process.env.JWT_SECRET
                  var package = { 'device': id, 'access': 'authenticated', 'agent': agent, 'user': result_db[0].email }
                  return jwt.sign(package, sign, { expiresIn: '90 days' });
              };
              var updatedToken = createAuthToken(req.body.device, req.body.userAgent);
              var newDate = new Date();
              var expDate = newDate.setMonth(newDate.getMonth() + 3)
              res.cookie('id', updatedToken, { sameSite: true, maxAge: expDate });
              res.json({ message: 'ok' });
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
