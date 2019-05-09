const nodemailer = require('nodemailer');
const templates = require('../templates/template');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'cornerfood.ironhack@gmail.com',// verificar con carlos
        pass: 'Qwerty12345678'
    }
});

module.exports.activateAccount = (user) => {
    const subject = "Welcome to Corner Food!";
    const message = "Hello and welcome to the best food experience you'll try in your life"

    return transporter.sendMail({
        from: '"Corner Food 🥝🥦🍹" <myawesome@project.com>',
        to: user.email, 
        subject: subject, 
        text: message,
        html: templates.templateCorner(message, user)
      })
}
  