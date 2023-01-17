const { Router } = require("express");
const { getAllAnimal, getDetail } = require("../controllers/AnimalControllers");


const animalRouter = Router();

animalRouter.get('/', getAllAnimal);
animalRouter.get('/:id', getDetail);


module.exports = animalRouter;