const AuthenticationController = require("./controllers/authentication");
const userController = require("./controllers/user");
const searchesController = require("./controllers/searches");

const express = require("express");
const passportService = require("./config/passport");
const passport = require("passport");
const requireAuth = passport.authenticate("jwt", { session: false });
const requireLogin = passport.authenticate("local", { session: false });
const	REQUIRE_ADMIN = "Admin",
		REQUIRE_OWNER = "Owner",
		REQUIRE_CLIENT = "Client",
		REQUIRE_MEMBER = "Member";

module.exports = function (app) {
	const apiRoutes = express.Router()
	const authRoutes = express.Router();

	// login
	//   authenticateUser

	const userRoutes = express.Router();

	userRoutes.post("/login", userController.login);

	apiRoutes.use("/user", userRoutes);

	// searches/getall
	//   authenticateToken
	// searches/add
	//   authenticateToken
	// searches/delete
	//   authenticateToken

	const searchRoutes = express.Router();

	searchRoutes.post("/getall", searchesController.getAll);
	searchRoutes.post("/add", searchesController.add);
	searchRoutes.post("/delete", searchesController.delete);

	apiRoutes.use("/searches", searchRoutes);





	authRoutes.post("/register", AuthenticationController.register);

	// authRoutes.post("/login", requireLogin, AuthenticationController.login);
	authRoutes.post("/login", AuthenticationController.login);

	//authRoutes.post("/searches", searchesController.getSearches);
	authRoutes.post("/authUser", AuthenticationController.authenticateUser);
	authRoutes.post("/authToken", AuthenticationController.authenticateToken);





	apiRoutes.use("/auth", authRoutes);

	app.use("/api", apiRoutes);
};