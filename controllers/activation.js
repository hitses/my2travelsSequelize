const models = require('../models/')

async function addActivationCode(UserId, code){
  return models.ActivationCode.create({
    UserId,
    code,
  });
};

module.exports = {
  addActivationCode,
}