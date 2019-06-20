var express = require('express');
var router = express.Router();
var hbs = require('nodemailer-express-handlebars');
var winston = require('../config/winston');
/* var path = require('path'); */
const email = require('../config/emailConf');

router.get('/mail', function(req, res){
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

  winston.fileError("Local de logs");

  email.transporter.use('compile', hbs(handlebarOptions));
  let message = {
    to: 'jerogassan@gmail.com',
    subject: 'Mail desde My 2 Travels de Sequelize',
    template: 'email',
    context: {
      texto: 'Mail para comprobar que funciona el contenido del mail.'
    },
    attachments: [
      {
          filename: 'logoTesoroArcano512.png',
          path: `/Users/jeronimogascon/Desktop/ESCRITORIO/my2travels-sequelize/logoTesoroArcano512.png`,
          content: '¡Mira! ¡Un tesoro!',
      },
    ],
  };
  email.transporter.sendMail(message,(error,info) =>{
    if(error){
        res.status(500).send(error, message);
        return
      }
    Email.transporter.close();
    res.status(200).send('Respuesta "%s"' + info.response)
  })
});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

/* d.alfageme@geekshubs.com */