const express = require('express')
var router = express.Router()
//get database connection
var con = require('../database/database.js')

const sgMail = require('@sendgrid/mail');

var domain = 'http://localhost:8080'

router.post('/', (req, res) => {
  var server_secret = req.body.secret
  var email = req.body.email
  if(server_secret == process.env.SERVER_SECRET)
  var secret = generateSecret(30)
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email,
    from: 'info@dostavljac.com',
    subject: 'Potrdi svoj email!',
    html: '<a href="'+domain+'/api/verifyEmail?secret='+secret+'">Potrdi svoj email</a> ali uporabi to povezavo:<br> '+domain+'/api/verifyEmail?secret='+secret,
  };
  sgMail.send(msg);
  res.send('Email was sent to '+email)
})

function generateSecret(length) {
  var ret = "";
  while (ret.length < length) {
    ret += Math.random().toString(16).substring(2);
  }
  return ret.substring(0,length);
}

module.exports = router;
