const { transporter } = require("../utils/mailer");

const mailer = async (req, res) => {
  const { email, name, description } = req.body;
  const imageHuellitas = "https://lh3.googleusercontent.com/a/AEdFTp5y03Rs5TO_QAPI1GvXO0MXwrwxc5GnifUN53Xp=s96-c-rg-br100"
  console.log(email);
  console.log(name);
  console.log(description);

  try {
<<<<<<< HEAD
    if (name === "NewsLetter") {
      await transporter.sendMail({
        from: '"NewsLetter" <hdeamor2023@gmail.com>', // sender address
        to: email, // list of receivers
        subject: `NewsLetter de Huellitas de amor}`, // Subject line
        html: `<!DOCTYPE html>
        <html>
        <body>
        <h1>Gracias por inscribirse al Newsletter de Huellitas</h1>
        <h3>Le estaremos enviando informacion relevante de nuestras mascotas/h3>
        <h6>Mantente al tanto!!!</h6>
        <img src=${imageHuellitas} alt="Huellitas de amor">
        </body>
        </html>`, // html body
      });
    } else {
      await transporter.sendMail({
        from: '"Huellitas de amor" <hdeamor2023@gmail.com>', // sender address
        to: email, // list of receivers
        subject: `Bienvenido ${name}`, // Subject line
        html: `<!DOCTYPE html>
        <html>
        <body>
        <h1>Hola, ${name} </h1>
        <h3>Gracias por contactarnos</h3>
        <h4>Enseguida nos pondremos en contacto con usted</h4>
        <p>Este es su mensaje: ${description}</p>
        <img src=${imageHuellitas} alt="Huellitas de amor">
        </body>
        </html>`, // html body
      });
    }
=======
    await transporter.sendMail({
      from: process.env.MAILER_EMAIL, // sender address
      to: email, // list of receivers
      subject: `Bienvenido ${name}`, // Subject line
      html: "<b>Esta es la seccion de noticias de Huellitas</b>", // html body
    });
>>>>>>> 8da1656 (fix/client requerido inicio de sesion para ciertas acciones)
  } catch (error) {}
};

module.exports = mailer;
