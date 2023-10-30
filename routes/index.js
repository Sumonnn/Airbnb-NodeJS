var express = require('express');
var router = express.Router();
const listing = require('../models/listing');
const wrapAsync = require('../utility/wrapAsync');
const ExpressError = require('../utility/ExpressError')


/* GET home page. */
router.get('/', function (req, res) {
  res.send("Hello, I'm Root");
});
//index route
router.get('/listings', wrapAsync(async (req, res) => {
  const allListing = await listing.find();
  res.render('listing/index.ejs', {
    allListing: allListing,
  });
}));
//new route
router.get('/listings/new', (req, res) => {
  res.render('listing/new.ejs');
})
//show route
router.get('/listings/:id', wrapAsync(
  async (req, res) => {
    const Listing = await listing.findById(req.params.id);
    res.render('listing/show.ejs', {
      Listing: Listing,
    })
  }
));
//create route
router.post('/listings/create', wrapAsync(async (req, res, next) => {
  if(!req.body){
    throw new ExpressError(400,'Send valid data for listing!');
  }
  const newListing = new listing(req.body);
  await newListing.save();
  res.redirect('/listings/new');
}))
//edit route
router.get('/listings/:id/edit', wrapAsync(async (req, res) => {
  const Listing = await listing.findById(req.params.id);
  res.render('listing/edit.ejs', {
    Listing: Listing,
  })
}))
//update route
router.post('/listings/:id', wrapAsync(async (req, res) => {
  if(!req.body){
    throw new ExpressError(400,'Send valid data for listing!');
  }
  await listing.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/listings/${req.params.id}`); 
}))
//delete route
router.get('/listings/:id/delete',wrapAsync( async (req, res) => {
  await listing.findByIdAndDelete(req.params.id);
  res.redirect(`/listings`);
}))
//
router.all("*", (req, res, next) => {
  next(new ExpressError(404, 'Page Not Found!'));
})
//middleware error handle
router.use((err, req, res, next) => {
  let { status=500, message='Something Went Wrong!' } = err;
  res.status(status).render('error.ejs',{ message });
  // res.status(status).send(message);
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
