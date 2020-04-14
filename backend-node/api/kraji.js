const express = require('express')
var router = express.Router()

var kraji = require('../api-data/kraji.json')

//GET /api/kraji
router.get('/', (req, res) => {
  var query = req.query.filter.toLowerCase() || 'null'
  if(query != 'null'){
    var result = '{"result":[]}';
    var obj = JSON.parse(result);
    for(i=0;i<kraji.length;i++){
      if((kraji[i].postnaStevilka.toString()).includes(query) || (kraji[i].kraj.toLowerCase()).includes(query)){
        obj['result'].push({"postnaStevilka":kraji[i].postnaStevilka,"kraj":kraji[i].kraj});
      }
    }
    res.json(obj)
  } else {
    res.json(kraji)
  }
})



module.exports = router;
