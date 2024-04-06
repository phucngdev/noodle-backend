const express = require("express");
const routerNoodle = express.Router();
const noodleController = require("../controllers/noodleController");
// adđ author
routerNoodle.post("/", noodleController.addNoodle);
// get all
routerNoodle.get("/", noodleController.getAllNoodle);
// get a Noodle by id
routerNoodle.get("/:id", noodleController.getANoodle);
// update Noodle by id
routerNoodle.put("/:id", noodleController.updateNoodle);
// delete Noodle by id
routerNoodle.delete("/:id", noodleController.deleteNoodle);

module.exports = routerNoodle;
