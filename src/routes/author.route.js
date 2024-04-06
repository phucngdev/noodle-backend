const express = require("express");
const routerAuthor = express.Router();
const authorController = require("../controllers/authorController");
// adđ author
routerAuthor.post("/", authorController.addAuthor);
// get all
routerAuthor.get("/", authorController.getAllAuthor);
// get an author
routerAuthor.get("/:id", authorController.getAnAuthor);
// update author by id
routerAuthor.put("/:id", authorController.updateAuthor);
// delete by id
routerAuthor.delete("/:id", authorController.deleteAuthor);

module.exports = routerAuthor;
