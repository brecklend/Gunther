const AuthenticationController = require("./controllers/authentication");
const express = require("express");
// const passportService = require("./config/passport");
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

	authRoutes.post("/register", AuthenticationController.register);

	authRoutes.post("/login", requireLogin, AuthenticationController.login);

	apiRoutes.use("/auth", authRoutes);

	app.use("/api", apiRoutes);
};