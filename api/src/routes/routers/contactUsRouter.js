const { Router } = require("express");
const{getContactUs,postContactUs} =require("../controllers/ContactUsController")

const contactUsRouter = Router();

contactUsRouter.get("/", getContactUs);
contactUsRouter.post("/", postContactUs);

module.exports = contactUsRouter;
