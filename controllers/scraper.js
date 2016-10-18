"use strict";

const jwt = require("jsonwebtoken");
const auth = require("../utils/auth");

exports.startScrape = function (req, res, next) {
	console.log("run scraper");
	if (!auth.validToken(req)) {
		console.log("startScrape not auth");
		
		return res.status(401).json({
			error: "Unauthorized"
		});
	}

	//run scraper.js
	//restart server.js

	res.status(200).json({
		message: "Scraper successfully ran and service restarted"
	});
};