const express = require('express')
var router = express.Router()
var con = require('../database/database.js')
const jwt = require('jsonwebtoken');

var middleware = require('../middlewares.js')

var isAuth = middleware.authenticateRoute

router.get('/', (req, res) => {
  var token = req.cookies["id"];
  if(verifyCookie()){
    res.redirect('/dashboard')
  } else {
    res.sendFile('index.html', { root: '../frontend/' })
  }
})

router.get('/dashboard', isAuth, (req, res) => {
  res.sendFile('main.html', { root: '../frontend/' })
})

router.get('/spremeni-geslo', isAuth, (req, res) => {
  res.sendFile('change-password.html',  { root: '../frontend' })
})

router.get('/pozabljeno-geslo', (req, res) => {
  res.sendFile('reset-password.html',  { root: '../frontend' })
})

function verifyCookie(token){
  var sign = process.env.JWT_SECRET;
  jwt.verify(token, sign, function (err, decoded) {
    if (err || !decoded) {
        console.log("invalid token");
        return false;
    }
    else if (decoded && (!decoded.access || decoded.access == "unauthenticated")) {
        console.log("unauthenticated token");
        return false;
    }
    else if (decoded && decoded.access == "authenticated") {
        console.log("valid token")
        return true;
    }
    else {
        console.log("something suspicious")
        return false;
    }
  })
}

module.exports = router;
