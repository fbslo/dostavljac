const express = require('express')
var router = express.Router()
//get database connection
var con = require('../database/database.js')

router.post('/', (req, res) => {
  var server_secret = req.body.secret
  var email = req.body.email
})

module.exports = router;
