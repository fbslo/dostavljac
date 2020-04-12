const express = require('express')
var router = express.Router()
//get database connection
var con = require('../database/database.js')

/*
* Database table: verifyEmail
* email TEXT, secret TEXT, date TEXT, used BOOL
*/

router.get('/', (req, res) => {
  try {
    //get secret from url ?secret=
    var secret = req.query.secret
    var sql = 'SELECT * FROM verifyEmail WHERE secret = ?;'
    con.query(sql, secret, (err, result) => {
      if(err) throw new Error('Database connection error')
      else {
        if(result.length == '0') res.send('This secret does not exisit')
        else {
          confirmEmail(result[0].email)
          res.send('')
        }
      }
    })
  } catch (error) {
    console.log('error'+error)
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

module.exports = router;
