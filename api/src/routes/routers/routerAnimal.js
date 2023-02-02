const { Router } = require("express");
const {isAuthenticated} = require("../controllers/AuthControllers")
const { getAllAnimal, getDetail, postAnimal, deleteAnimal, updateAnimal, postReview, putReview } = require("../controllers/AnimalControllers");


const animalRouter = Router();

animalRouter.get('/', getAllAnimal);

animalRouter.get('/:id', getDetail);

animalRouter.post("/", postAnimal);

animalRouter.delete("/:id", deleteAnimal)

animalRouter.put("/:id", updateAnimal)

animalRouter.post("/:id/review", postReview)

animalRouter.put("/:id/review/:idreview", putReview)

module.exports = animalRouter;