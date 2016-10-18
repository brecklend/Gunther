const AuthenticationController = require("./controllers/authentication");
const userController = require("./controllers/user");
const scraperController = require("./controllers/scraper");

const searchesController = require("./controllers/searches");
const auth = require("./utils/auth");

const express = require("express");
const passportService = require("./config/passport");
const passport = require("passport");
const requireAuth = passport.authenticate("jwt", { session: false });
const requireLogin = passport.authenticate("local", { session: false });

module.exports = function (app) {
	const apiRoutes = express.Router()
	// const authRoutes = express.Router();
	const userRoutes = express.Router();

	userRoutes.post("/login", userController.login);

	apiRoutes.use("/user", userRoutes);


	const scrapeRoutes = express.Router();

	scrapeRoutes.post("/run", scraperController.startScrape);

	apiRoutes.use("/scrape", scrapeRoutes);


	app.use("/", apiRoutes);


	// const searchRoutes = express.Router();

	// searchRoutes.post("/getall", searchesController.getAll);
	// searchRoutes.post("/add", searchesController.add);
	// searchRoutes.post("/delete", searchesController.delete);

	// apiRoutes.use("/searches", searchRoutes);

	// app.all("/api/searches/*", function (req, res, next) {
	// 	auth.authenticateToken(req, res, next);
	// 	console.log("authenticated");
	// 	next();
	// });








	///////////////////////////////////////////////////////////////////////////
	// authRoutes.post("/register", AuthenticationController.register);
	// authRoutes.post("/login", AuthenticationController.login);
	// authRoutes.post("/authUser", AuthenticationController.authenticateUser);
	// authRoutes.post("/authToken", AuthenticationController.authenticateToken);
	// apiRoutes.use("/auth", authRoutes);
	///////////////////////////////////////////////////////////////////////////








	// app.use("/api", apiRoutes);
};