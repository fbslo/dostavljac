const express = require('express')
var router = express.Router()
var con = require('../database/database.js')
const passport = require('passport');

var middleware = require('../middlewares.js')

var isAuth = middleware.authenticateRoute

router.get('/', (req, res) => {
  res.sendFile('index.html', { root: '../frontend/' })
})

router.get('/dashboard', isAuth, (req, res) => {
  res.sendFile('main.html', { root: '../frontend/' })
})

module.exports = router;
