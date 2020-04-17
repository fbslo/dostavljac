const express = require('express')
var router = express.Router()
//get database connection
var con = require('../database/database.js')
const sgMail = require('@sendgrid/mail');

var domain = process.env.DOMAIN

//password hashing
const bcrypt = require('bcrypt-nodejs');
const saltRounds = 10;

router.post('/', (req, res) => {
  var email = req.body.email
  if(!email) res.status(400).json({ message: "Missing credentials!" })
  else {
    con.query('SELECT * FROM users WHERE email=?;', email, (err, result) => {
      if(err) res.status(500).json({ message: 'Internal Server Error!' });
      else {
        if(!result || result.length == '0') res.status(400).json({ message: 'No such user found!' });
        else {
          var secret = generateSecret(30)
          saveSecretToDatabase(email, secret)
          sendResetEmail(email, secret)
          res.status(200).json({ message: 'Email sent!' });
        }
      }
    })
  }
})

router.post('/change', (req, res) => {
  var email = req.body.email
  var secret = req.body.secret
  var new_password = req.body.new_password
  if(!email || !new_password || !password) res.status(400).json({ message: "Missing credentials!" })
  else {
    con.query('SELECT * FROM resetPassword WHERE email=? AND secret = ?;', [email, secret], (err, result) => {
      if(err) res.status(500).json({ message: 'Internal Server Error!' });
      else {
        if(!result || result.length == '0') res.status(400).json({ message: 'No such user found!' });
        else {
          var secret_db = result[0].secret
          var status = result[0].status
          if(status == 'unused'){
            bcrypt.genSalt(saltRounds, function(err, salt) {
              bcrypt.hash(password, salt, null, async function(err, hash) {
                updatePassword(email, hash)
                updateResetPasswordDatabase(email, secret)
                res.status(200).json({ message: 'Password changed!' });
              })
            })
          } else {
            res.status(400).json({ message: 'Secret already used!' });
          }
        }
      }
    })
  }
})

function sendResetEmail(email, secret){
  const msg = {
    to: email,
    from: 'info@dostavljac.com',
    subject: 'Pozabljeno geslo!',
    html: '<a href="'+domain+'/resetPassword?secret='+secret+'">Spremeni svoje geslo</a> ali uporabi to povezavo:<br> '+domain+'/ResetEmail?secret='+secret,
  };
  sgMail.send(msg);
}

function saveSecretToDatabase(email, secret){
  var date = new Date;
  var values = [[email, secret, date, 'unused']]
  con.query('INSERT INTO resetPassword (email, secret, date, status) VALUES ?', [values], (err, result) => {
    if(err) console.log('Error inserting into resetPassword!')
    if(result) console.log("Inserted into resetPassword! Email: "+email)
  })
}

function updatePassword(email, password){
  con.query('UPDATE users SET password = ? WHERE email = ?', [password, email], (err, result) => {
    if(err) console.log('Error updating password!')
    if(result) console.log("Password updated! Email: "+email)
  })
}

function updateResetPasswordDatabase(email, secret){
  con.query('UPDATE resetPassword SET status = ? WHERE secret = ?', ['used', secret], (err, result) => {
    if(err) console.log('Error updating status in resetPassword!')
    if(result) console.log("Status updated in resetPassword! Email: "+email)
  })
}

function generateSecret(length) {
  var ret = "";
  while (ret.length < length) {
    ret += Math.random().toString(16).substring(2);
  }
  return ret.substring(0,length);
}

module.exports = router;
