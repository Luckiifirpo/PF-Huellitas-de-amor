const {Contactus } = require("../../db");
const { Op } = require('sequelize');
const { generateId } = require("../utils/utils");

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
    const { name, email, description} = req.body;

    
    const createdContactUs = await Contactus.create({
       id: generateId(),
       name,
       email,
       description,
    });

    try {
        res.status(201).send(createdContactUs)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
}

module.exports = {
  getContactUs,
  postContactUs,
};
