const CONN = require('../helpers/dbConnection');
const models = require('../models')
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

async function register(name, username, email, password){
  let hash = await bcrypt.hash(password, SALT_ROUNDS );
   return models.User.create({
    name,
    username,
    email,
    password: hash,
  })
}

async function checkLogin(email, password){
  let user = await models.User.findAll({
    where: {
      email: email
    }});
  if(user.length === 0){
    return null;
  } else{
    let match = await bcrypt.compare(password, user[0].password);
    return match ? user[0] : null;
  }
}

module.exports = {
  register,
  checkLogin
}