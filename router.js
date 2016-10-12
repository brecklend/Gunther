const	AuthenticationController = require("./controllers/authentication"),
		express = require("express"),
		passportService = require("./config/passport"),
		passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireLogin = passport.authenticate("local", { session: false });

const	REQUIRE_ADMIN = "Admin",
		REQUIRE_OWNER = "Owner",
		REQUIRE_CLIENT = "Client",
		REQUIRE_MEMBER = "Member";

module.exports = function (app) {
	const	apiRoutes = express.Router(),
			authRoutes = express.Router();

	apiRoutes.use("/auth", authRoutes);

	authRoutes.post("/register", AuthenticationController.register);

	authRoutes.post("/login", requireLogin, AuthenticationController.login);

	app.use("/api", apiRoutes);
};