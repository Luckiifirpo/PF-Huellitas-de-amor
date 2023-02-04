const { transporter } = require("../utils/mailer");

const mailer = async ({email}) => {
  
  const imageHuellitas = "https://lh3.googleusercontent.com/a/AEdFTp5y03Rs5TO_QAPI1GvXO0MXwrwxc5GnifUN53Xp=s96-c-rg-br100"
  const fecha = new Date()
  

  try {
    await transporter.sendMail({
        from: '"Huellitas" <hdeamor2023@gmail.com>', // sender address
        to: email, // list of receivers
        subject: `Inicio de Sesión`, // Subject line
        html: `<!DOCTYPE html>
        <html>
        <body>
        <h1>Se acaba de registrar un inicio de sesion con su cuenta</h1>
        <h3>Hora: ${fecha}</h3>
        <h6>No responder a este mensaje</h6>
        <img src=${imageHuellitas} alt="Huellitas de amor">
        </body>
        </html>`, // html body
      });
    
  } catch (error) {}
};

module.exports = mailer;
