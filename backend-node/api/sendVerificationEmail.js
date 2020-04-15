const express = require('express')
var router = express.Router()
//get database connection
var con = require('../database/database.js')

const sgMail = require('@sendgrid/mail');

var domain = process.env.DOMAIN

router.post('/', (req, res) => {
  var server_secret = req.body.server_secret
  var email = req.body.email
  if(!email || !server_secret){
    res.send('Missing information!')
  } else {
    if(server_secret == process.env.SERVER_SECRET){
      var secret = generateSecret(30)
      insertSecretIntoDatabase(secret, email)
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: email,
        from: 'info@dostavljac.com',
        subject: 'Potrdi svoj email!',
        html: '<a href="'+domain+'/api/verifyEmail?secret='+secret+'">Potrdi svoj email</a> ali uporabi to povezavo:<br> '+domain+'/api/verifyEmail?secret='+secret,
      };
      sgMail.send(msg);
      res.send('Email was sent to '+email)
    } else {
      res.send('Error')
    }
  }
})

function generateSecret(length) {
  var ret = "";
  while (ret.length < length) {
    ret += Math.random().toString(16).substring(2);
  }
  return ret.substring(0,length);
}

function insertSecretIntoDatabase(secret, email){
  var sql = 'INSERT INTO verifyEmail (email, secret, date, used) VALUES ?'
  var date = new Date
  var values = [[email, secret, date, false]]
  con.query(sql, [values], (err, result) => {
    if(!err) console.log('New verifyEmail inserted into database!')
    if(err) console.log('verifyEmail inserting failed! ' + err)
  })
}


module.exports = router;
