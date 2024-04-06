const routerUser = require("express").Router();
const userController = require("../controllers/userController");
const userVerifyMiddleware = require("../middlewares/verifyToken.middleware");

// get all
routerUser.get(
  "/",
  userVerifyMiddleware.verifyToken,
  userController.getAllUsers
);
// delete by id
routerUser.delete(
  "/:id",
  userVerifyMiddleware.verifyTokenAndUserAuthorization,
  userController.deleteUser
);

module.exports = routerUser;
