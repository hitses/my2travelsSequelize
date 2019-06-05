const CONN = require('../helpers/dbConnection');
const models = require('../models')

function createTravels(){
  return models.Travel.create({
    country,
    imgURL,
    price,
    discount,
    creator,
  })
};

function getTravels(){
  return models.Travel.findAll();
};

module.exports = {
  createTravels,
  getTravels
}