const { Router } = require("express");
const{getContactUs,postContactUs, contactUsReply} =require("../controllers/ContactUsController");
const mailer = require("../controllers/MailerController");


const contactUsRouter = Router();

contactUsRouter.get("/", getContactUs);
contactUsRouter.post("/", postContactUs);
contactUsRouter.post("/reply", contactUsReply);

module.exports = contactUsRouter;
