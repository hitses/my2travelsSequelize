/* var models  = require('../models'); */
var express = require('express');
var router  = express.Router();
const travelsController = require('../controllers/travels');

router.post('/', async (req, res) => {
  let {country, imgURL, price, discount, creator} = req.body;
  let isAdded = await travelsController.createTravels(country, imgURL, price, discount, creator);
  if(isAdded){
    res.redirect('/travels');
  } else{
    req.flash('error', 'El viaje no se ha podido añadir.');
    res.redirect('/travels');
  };
});

router.get('/', async(req, res) => {
  let travels = await travelsController.getTravels();

  res.render('travels/travels', {
    travels,
  });
})

module.exports = router;