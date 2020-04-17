const express = require('express')
var router = express.Router()
//get database connection
var con = require('../database/database.js')
const jwt = require('jsonwebtoken');

var sign = process.env.JWT_SECRET;

router.get('/', (req, res) => {
  var token = req.cookies["id"];
  jwt.verify(token, sign, function (err, decoded) {
    cookie = decoded
  })
  var sql = 'SELECT *, "" as password FROM users WHERE email=?;'
  var email = cookie.user
  con.query(sql, email, (err, result) => {
    if(err) res.status(500).json({ message: "Internal Server Error!" })
    else {
      if(!result || result.length == '0') res.status(400).json({ message: "No such user found!" })
      else {
        res.status(200).json({ message: "ok", result: result[0] })
      }
    }
  })
})



module.exports = router;
