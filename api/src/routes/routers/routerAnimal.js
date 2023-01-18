const { Router } = require("express");
const { getAllAnimal, getDetail, postAnimal } = require("../controllers/AnimalControllers");


const animalRouter = Router();

animalRouter.get('/', getAllAnimal);

animalRouter.get('/:id', getDetail);

animalRouter.post("/", postAnimal);


module.exports = animalRouter;