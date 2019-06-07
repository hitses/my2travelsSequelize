const CONN = require('../helpers/dbConnection');
const models = require('../models')

async function createTravels(destiny, img, price, discount, UserId){
  return models.Travel.create({
    destiny,
    img,
    price,
    discount,
    UserId,
  })
};

function getTravels(){
  return models.Travel.findAll({
    include: [{
      model: models.User
    }]
  })
}
module.exports = {
  createTravels,
  getTravels
}