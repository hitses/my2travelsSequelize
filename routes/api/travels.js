var express = require('express');
var router = express.Router();

router.get('/add', async(req, res) => {
  let travels = await travelsController.getTravels();

  res.send('api/travels', {
    travels,
  });
})