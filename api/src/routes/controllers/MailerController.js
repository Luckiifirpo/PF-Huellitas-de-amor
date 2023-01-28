const  {transporter} = require ("../utils/mailer")

const mailer = async (req, res) => {
  const { email,name,description } = req.body;
  console.log(email);
  console.log(name);
  console.log(description);
  try {
    await transporter.sendMail({
      from: process.env.MAILER_EMAIL, // sender address
      to: email, // list of receivers
      subject: `Bienvenido ${name}`, // Subject line
      html: "<b>Esta es la seccion de noticias de Huellitas</b>", // html body
    });
  } catch (error) {}
};

module.exports = mailer;
