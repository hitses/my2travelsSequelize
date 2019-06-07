var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users');

/* GET users listing. *//* 
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
}); */

router.post('/login', async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  
  if(!email || !password){
    req.flash('errors', 'Falta usuario o contraseña');
    res.redirect('/users/login')
  } else {
    let user = await usersController.checkLogin(email,password);
  
    if(user){
      req.session.email = user.email;
      req.session.name = user.name;
      req.session.userId = user.id;
      req.session.logginDate = new Date();
      res.redirect('/');
    }else{
      req.flash('errors', 'Usuario o contraseña inválido');
      res.redirect('/users/login');
    }
  }

});

router.get('/login', (req, res) => {
  let error = req.flash('errors');
  if(req.session.name){
    res.redirect('/');
  }else{
    res.render('users/login', {
      error
    });
  }
})

router.get('/register', (req, res) => {
  let error = req.flash('error');
  res.render('users/register',{
    error
  });
});

router.post('/register', async (req, res) => {
  let { name, username, email, password} = req.body;
  let isRegistered = await usersController.register(name, username, email, password);

  if(isRegistered){
    res.redirect('/users/login')
  } else if(email === models.User.email){
    req.flash('error', 'El correo electrónico ya existe');
    res.redirect('/users/register');
  }else{
    req.flash('error', 'No se ha podido registrar');
    res.redirect('/users/register');
  }
})


module.exports = router;
