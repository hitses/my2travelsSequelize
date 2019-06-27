var express = require('express');
var router  = express.Router();

const travelsController = require('../controllers/travels');
const { isLogged } = require('../middlewares/isLogged');

router.post('/add', isLogged, async (req, res) => {
  let {destiny, img, price, discount, UserId} = req.body;
  let isAdded = await travelsController.createTravels(destiny, img, price, discount, UserId);
  if(isAdded){
    res.redirect('/');
  } else{
    req.flash('error', 'El viaje no se ha podido añadir.');
    res.redirect('/');
  };
});

router.get('/add', isLogged, async(req, res) => {
  let travels = await travelsController.getTravels();

  res.render('travels/add', {
    travels,
  });
})

module.exports = router;