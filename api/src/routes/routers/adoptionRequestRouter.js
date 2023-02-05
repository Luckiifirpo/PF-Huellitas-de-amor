const { Router } = require("express");
const { postAdoptionRequest, getAdoptionRequestById, authorizeAdoptionRequest } = require("../controllers/AdoptionRequestController");

const adoptionRequestRouter = Router();

adoptionRequestRouter.post("/", postAdoptionRequest);
adoptionRequestRouter.get("/:id", getAdoptionRequestById);
adoptionRequestRouter.post("/authorize_adoption_request/:id", authorizeAdoptionRequest);


module.exports = adoptionRequestRouter;