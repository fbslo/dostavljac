const express = require('express')
var router = express.Router()
//get database connection
var con = require('../database/database.js')

//GET /api/verifyEmail
router.get('/', (req, res) => {
  try {
    //get secret from url query ?secret=
    var secret = req.query.secret
    var sql = 'SELECT * FROM verifyEmail WHERE secret = ?;'
    con.query(sql, secret, (err, result) => {
      if(err) throw new Error('Database connection error')
      else {
        if(result.length == '0') res.send('This secret does not exisit')
        else {
          confirmEmail(result[0].email)
          updateDatabase(result[0].email)
          res.send('Vaš email naslov je potrjen!')
        }
      }
    })
  } catch (error) {
    console.log('Error: '+error)
  }
})

function confirmEmail(email){
  var sql = 'UPDATE verifyEmail SET used = true;'
  con.query(sql, (err, result) => {
    if(err) console.log('Error updating verifyEmail database! ' +err)
    else {
      console.log('User '+email+' verified!')
    }
  })
}

function updateDatabase(email){
  var sql = 'UPDATE users SET verifiedEmail = "true" WHERE email = ?;'
  con.query(sql, email, (err, result) => {
    if(err) console.log('Error updating users database! ' +err)
    else {
      console.log('User '+email+' verified and database user changed!')
    }
  })
}

module.exports = router;
