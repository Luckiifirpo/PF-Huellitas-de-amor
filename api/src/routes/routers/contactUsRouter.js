const { Router } = require("express");
const{getContactUs,postContactUs} =require("../controllers/ContactUsController");
const mailer = require("../controllers/MailerController");


const contactUsRouter = Router();

contactUsRouter.get("/", getContactUs);
contactUsRouter.post("/", postContactUs);


module.exports = contactUsRouter;
