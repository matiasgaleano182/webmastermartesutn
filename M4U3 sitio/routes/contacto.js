var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('contacto', {
    isContacto: true
  });
});

router.post('/', async (req, res, next) => {
  var nombre = req.body.nombre;
  var email = req.body.email;
  var telefono = req.body.tel;
  var mensaje = req.body.mensaje;

  var obj = {
    to: 'matiasgaleano182@gmail.com',
    subject: 'contacto de la web',
    html: nombre = "se contacto a traves de la pagina y quiere mas info a este correo: " + email + " . <br> Ademas hizo el siguiente comentario: " + mensaje + ". <br> Su tel es " + telefono 
  }
  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    }
  })

  var info = await transporter.sendMail(obj);

  res.render('contacto', {
    isContacto: true,
    message: 'mensaje enviado correctamente'
  });

})


module.exports = router;
