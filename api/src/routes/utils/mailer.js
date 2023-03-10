const nodemailer = require("nodemailer");
const {
  MAILER_PASS,MAILER_EMAIL
} = process.env


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: MAILER_EMAIL , // generated ethereal user
      pass: MAILER_PASS, // generated ethereal password
    },
  });

  transporter.verify().then(()=>{
    console.log('Ready for send emails')
    })

  module.exports = {transporter}