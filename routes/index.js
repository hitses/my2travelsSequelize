var express = require('express');
var router = express.Router();
const travelsController = require('../controllers/travels');

/* GET home page. */
router.get('/', async(req, res, next) => {
  let travels = await travelsController.getTravels();

  res.render('index', {
    title: 'My2Travels',
    travels,
  });
});

module.exports = router;