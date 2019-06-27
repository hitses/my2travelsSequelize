var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users');
var hbs = require('nodemailer-express-handlebars');
var activationEmail = require('../config/emailConf');
var { addActivationCode } = require('../controllers/activation');

router.post('/login', async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let active = req.session.active;
  
  if(!email || !password){
    req.flash('errors', 'Falta usuario o contraseña');
    res.redirect('/users/login');
  } else if(active === 'noActivated'){
    req.flash('errors', 'No has confirmado tu cuenta de correo.');
    res.redirect('/users/login');
  } else {
    let user = await usersController.checkLogin(email,password);
  
    if(user){
      req.session.email = user.email;
      req.session.name = user.name;
      req.session.userId = user.id;
      req.session.logginDate = new Date();
      res.redirect('/');
    }else{
      req.flash('errors', 'Correo electrónico o contraseña inválido');
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
    let idUser = isRegistered.id;
    let randomActivationCode = Date.now() + '$' + idUser;
    let activationCode = `https://localhost:3000/activate/${randomActivationCode}`

    let result = await addActivationCode(idUser, randomActivationCode);
    console.log(result);

    const handlebarOptions = {
      viewEngine: {
        extname: '.hbs',
        partialsDir: './views/email-templates/partials',
        layoutsDir: './views/email-templates/layouts',
        defaultLayout: 'email.body.hbs',
      },
      viewPath: './views/email-templates',
      extName: '.hbs',
    };
  
    activationEmail.transporter.use('compile', hbs(handlebarOptions));
    let message = {
      to: email,
      subject: 'Activación de tu cuenta en My 2 Travels',
      template: 'email',
      context: {
        texto: activationCode,
      },
      /* attachments: [
        {
            filename: 'redux.png',
            path: `/Users/jeronimogascon/Desktop/Proyectos/redux.png`,
            content: 'Archivo adjunto.',
        },
      ], */
    };
    activationEmail.transporter.sendMail(message,(error,info) =>{
      if(error){
          res.status(500).send(error, message);
          return
        }
      activationEmail.transporter.close();
      res.status(200).send('Respuesta "%s"' + info.response);
    })
    res.redirect('/users/login')
  } else if(email === models.User.email){
    console.log(email, models.User.email);
    req.flash('error', 'El correo electrónico ya existe');
    res.redirect('/users/register');
  }else{
    req.flash('error', 'No se ha podido registrar');
    res.redirect('/users/register');
  }
})

router.get('/active/:code', (req, res) => {
  res.render('users/activated', {
  })
})

module.exports = router;