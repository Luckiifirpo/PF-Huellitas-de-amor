const {Router} = require("express");
const {Op, Animal} = require("../../db")
// const axios = require("axios");
const router = Router();

router.post("/", async (req, res) => {
    const {id, name, publication, species, age, weight, size, gender, race, description, image} = req.body;

    const createdAnimal = await Animal.create({
       id,
       name,
       publication,
       species,
       age,
       weight,
       size,
       gender,
       race,
       description,
       image,
    });

    try {
        res.status(200).send(createdAnimal)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

module.exports = router;