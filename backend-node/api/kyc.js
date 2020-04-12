const express = require('express')
var router = express.Router()
//get database connection
var con = require('../database/database.js')

//POST /api/kyc
router.post('/', (req, res) => {
  var image = req.files.file
  var email = req.body.email
  var date = new Date()
  //verify that file is image
  if(!image || !email || image.mimetype != 'image/jpeg' && image.mimetype != 'image/png' && image.mimetype != 'image/gif') {
    res.send("Wrong file format or file missing!")
    console.log(image.mimetype)
  } else {
    //upload file to /kyc
    var image_name = image.name+email+date
    image.mv(require('path').dirname(require.main.filename)+'/kyc/'+image_name, function(err) {
      var sql = 'INSERT INTO kyc (email, image, date) VALUES ?'
      var values = [[email, image_name, date]]
      con.query(sql, [values], (err, result) => {
        if(!err){
           res.send("File uploaded!")
        }
        if(err) res.send("Error, file not uploaded!")
      })
    })
  }
})



module.exports = router;
