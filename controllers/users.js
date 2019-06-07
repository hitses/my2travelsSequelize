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

// dos funciones con el mismo nombre?
//Quieres encontrar todos los usuarios o uno?
// findOne
// clausula where en el findall/findOne
function checkLogin(email, password){
   return models.User.findOne({
     where: {email: email}.then(User => {
      if(User.length !== 0){
        resolve(null)
    }else{
        bcrypt.compare(password, users[0].password, (err, match) => {
            resolve( match ? users[0] : null);
        })
        resizeBy.send('/')
    }
    })
  })
}

module.exports = {
  register,
  checkLogin
}