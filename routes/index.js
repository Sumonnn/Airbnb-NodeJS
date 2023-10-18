var express = require('express');
var router = express.Router();
const listing = require('../models/listing');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/testlisting',async (req,res)=>{
  try {
     const samplelisting = new listing({
      title:'My New Villa',
      description:'By the beach',
      price:1200,
      location:'Calangute, Goa',
      country:'India',
     });
    await samplelisting.save();
    res.send('success');
  } catch (error) {
     res.send(error);
  }
})

module.exports = router;
