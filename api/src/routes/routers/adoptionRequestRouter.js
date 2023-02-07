const { Router } = require("express");
const { postAdoptionRequest, getAdoptionRequestById, authorizeAdoptionRequest, sendRequestDataReviewEmail, rejectAdoptionRequest } = require("../controllers/AdoptionRequestController");

const adoptionRequestRouter = Router();

adoptionRequestRouter.post("/", postAdoptionRequest);
adoptionRequestRouter.get("/:id", getAdoptionRequestById);
adoptionRequestRouter.post("/authorize_adoption_request/:id", authorizeAdoptionRequest);
adoptionRequestRouter.post("/send_request_data_review_email/", sendRequestDataReviewEmail);
adoptionRequestRouter.post("/reject_adoption_request/", rejectAdoptionRequest);


module.exports = adoptionRequestRouter;