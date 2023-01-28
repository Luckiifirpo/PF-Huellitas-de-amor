const { Contactus } = require("../../db");
const { Op } = require("sequelize");
const { generateId } = require("../utils/utils");
const { transporter } = require("../utils/mailer");

// postContactUs

const getContactUs = async (req, res) => {
  const { name } = req.query;
  try {
    if (!name) {
      const allContactUs = await Contactus.findAll();
      return res.send(allContactUs);
    } else {
      let contactUs = await Contactus.findAll({
        where: {
          name: {
            [Op.like]: "%" + name + "%",
          },
        },
      });
      if (!contactUs[0]) {
        return res.status(404).json({ error: "No existe ese nombre" });
      }
      return res.send(contactUs);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const postContactUs = async (req, res) => {
  const { name, email, description } = req.body;
  const imageHuellitas = "https://lh3.googleusercontent.com/a/AEdFTp5y03Rs5TO_QAPI1GvXO0MXwrwxc5GnifUN53Xp=s96-c-rg-br100"

  const createdContactUs = await Contactus.create({
    id: generateId(),
    name,
    email,
    description,
  });

  try {
<<<<<<< HEAD
    if (name === "NewsLetter") {
      await transporter.sendMail({
        from: '"NewsLetter" <hdeamor2023@gmail.com>', // sender address
        to: email, // list of receivers
        subject: `NewsLetter de Huellitas de amor`, // Subject line
        html: `<!DOCTYPE html>
        <html>
        <body>
        <h1>Gracias por inscribirse al Newsletter de Huellitas</h1>
        <h1>Le estaremos enviando informacion relevante de nuestras mascotas</h1>
        <h3>Mantente al tanto!!!</h3>
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
        <h1>Gracias por contactarnos</h1>
        <h1>Enseguida nos pondremos en contacto con usted</h1>
        <h3>Este es su mensaje: ${description}</h3>
        <img src=${imageHuellitas} alt="Huellitas de amor">
        </body>
        </html>`, // html body
      });
    }
=======
    const info = await transporter.sendMail({
      from: process.env.MAILER_EMAIL, // sender address
      to: email, // list of receivers
      subject: `Bienvenido ${name}`, // Subject line
      html: "<b>Gracias por contactarnos en breve responderemos sus inquietudes</b>", // html body
    });
>>>>>>> 8da1656 (fix/client requerido inicio de sesion para ciertas acciones)
    res.status(201).send(createdContactUs);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }

  // console.log(email);
  // console.log(name);
  // console.log(description);
  //   try {
  //     await transporter.sendMail({
  //       from: '"NewsLetter" <alexpalagomez7@gmail.com>', // sender address
  //       to: email, // list of receivers
  //       subject: `Bienvenido ${name}`, // Subject line
  //       html: "<b>Esta es la seccion de noticias de Huellitas</b>", // html body
  //     });
  //   } catch (error) {}
};

module.exports = {
  getContactUs,
  postContactUs,
};
