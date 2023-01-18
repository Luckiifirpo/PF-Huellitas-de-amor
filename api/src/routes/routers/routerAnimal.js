const { Router } = require("express");
const { getAllAnimal, getDetail, postAnimal, deleteAnimal } = require("../controllers/AnimalControllers");


const animalRouter = Router();

animalRouter.get('/', getAllAnimal);

animalRouter.get('/:id', getDetail);

animalRouter.post("/", postAnimal);

animalRouter.delete("/:id", deleteAnimal)


module.exports = animalRouter;