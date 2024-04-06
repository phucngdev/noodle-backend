const express = require("express");
const routerMail = express.Router();
const emailController = require("../controllers/emailController");
// send email
routerMail.post("/", emailController.sendEmail);

module.exports = routerMail;
