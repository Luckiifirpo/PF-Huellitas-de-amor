const { Router } = require("express");
const {isAuthenticated} = require("../controllers/AuthControllers")
const { getAllAnimal, getDetail, postAnimal, deleteAnimal, updateAnimal } = require("../controllers/AnimalControllers");


const animalRouter = Router();

animalRouter.get('/', getAllAnimal);

animalRouter.get('/:id', getDetail);

animalRouter.post("/",isAuthenticated, postAnimal);

animalRouter.delete("/:id", deleteAnimal)

animalRouter.put("/:id", updateAnimal)

module.exports = animalRouter;