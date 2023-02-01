const { Router } = require("express");
const { postAdoptionRequest } = require("../controllers/AdoptionRequestController");

const adoptionRequestRouter = Router();

adoptionRequestRouter.post("/", postAdoptionRequest);


module.exports = adoptionRequestRouter;