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

function checkLogin(email, password){
  return new Promise((resolve, reject) => {
      const selectQuery = 'SELECT * FROM users WHERE email = ?';
      CONN.query(selectQuery, [email], (err, users) => {
          if(users.length !== 0){
              resolve(null)
          }else{
              // Comparar contraseñas
              bcrypt.compare(password, users[0].password, (err, match) => {
                  resolve( match ? users[0] : null);
              })
          }
      })
  })
}

module.exports = {
  register,
  checkLogin
}