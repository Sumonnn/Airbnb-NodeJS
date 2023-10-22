var express = require('express');
var router = express.Router();
const listing = require('../models/listing');


/* GET home page. */
router.get('/', function (req, res) {
  res.send("Hello, I'm Root");
});
//index route
router.get('/listings', async (req, res) => {
  try {
    const allListing = await listing.find();
    res.render('listing/index.ejs', {
      allListing: allListing,
    })
  } catch (error) {
    res.send(error);
  }
})
//new route
router.get('/listings/new', (req, res) => {
  res.render('listing/new.ejs');
})
//show route
router.get('/listings/:id', async (req, res) => {
  try {
    const Listing = await listing.findById(req.params.id);
    res.render('listing/show.ejs', {
      Listing: Listing,
    })
  } catch (error) {
    res.send(error);
  }
})
//create route
router.post('/listings/create', async (req, res) => {
  try {
    const newListing = new listing(req.body);
    await newListing.save();
    res.redirect('/listings/new');
  } catch (error) {
    res.send(error);
  }
})
//edit route
router.get('/listings/:id/edit', async (req, res) => {
  try {
    const Listing = await listing.findById(req.params.id);
    res.render('listing/edit.ejs',{
      Listing:Listing,
    })
  } catch (error) {
    res.send(error);
  }
})
//update route
router.post('/listings/:id',async (req,res)=>{
  try {
    await listing.findByIdAndUpdate(req.params.id,req.body);
    res.redirect(`/listings/${req.params.id}`);
  } catch (error) {
    res.send(error);
  }
})
//delete route
router.get('/listings/:id/delete',async (req,res)=>{
  try {
     await listing.findByIdAndDelete(req.params.id);
     res.redirect(`/listings`);    
  } catch (error) {
     res.send(error);
  }
})

// router.get('/testlisting',async (req,res)=>{
//   try {
//      const samplelisting = new listing({
//       title:'My New Villa',
//       description:'By the beach',
//       price:1200,
//       location:'Calangute, Goa',
//       country:'India',
//      });
//     await samplelisting.save();
//     res.send('success');
//   } catch (error) {
//      res.send(error);
//   }
// })

module.exports = router;
