"use strict";

const jwt = require("jsonwebtoken");
const config = require("../config/main");

exports.startScrape = function (req, res, next) {
	var token = req.body.token;

	jwt.verify(token, config.secret, function (err, decoded) {
		if (!err) {
			//run scraper.js
			//restart server.js
			res.status(200).json({
				message: "Scraper successfully ran and service restarted"
			});
		}
		else {
			res.status(401).json({
				error: "Unauthorized token"
			});
		}
	});
};