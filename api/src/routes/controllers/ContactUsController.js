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

  const createdContactUs = await Contactus.create({
    id: generateId(),
    name,
    email,
    description,
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.MAILER_EMAIL, // sender address
      to: email, // list of receivers
      subject: `Bienvenido ${name}`, // Subject line
      html: "<b>Gracias por contactarnos en breve responderemos sus inquietudes</b>", // html body
    });
    res.status(201).send(createdContactUs);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }

  console.log(email);
  console.log(name);
  console.log(description);
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
