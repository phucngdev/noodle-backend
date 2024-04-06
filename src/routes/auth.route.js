const routerAuth = require("express").Router();
const authController = require("../controllers/authController");
const verifyToken = require("../middlewares/verifyToken.middleware");

//REGISTER
routerAuth.post("/register", authController.registerUser);
//REFRESH TOKEN
routerAuth.post("/refresh", authController.requestRefreshToken);
//LOG IN
routerAuth.post("/login", authController.loginUser);
//LOG OUT
routerAuth.post("/logout", verifyToken.verifyToken, authController.logOut);

module.exports = routerAuth;
