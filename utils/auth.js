"use strict";

const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("../config/main");

exports.authenticateToken = function (req, res, next) {
	console.log("authenticate token");
	//next();
	// var token = req.body.token;

	// jwt.verify(token, config.secret, function (err, decoded) {
	// 	if (err) {
	// 		return res.status(401).json({
	// 			error: "Unauthorized"
	// 		});
	// 	}

	// 	res.status(200).json({
	// 		user: decoded
	// 	});

	// 	next();
	// });
};

exports.validUser = function (user) {
	var status = false;
	var email = user.body.email;
	var password = user.body.password;

	switch (true) {
		case email == "utah@point.com" && password == "utahpwd":
		case email == "bodi@point.com" && password == "bodipwd":
			status = true;
			break;
	}

	return status;
};

exports.getTokenFor = function (user) {
	var userInfo = getUserFor(user);
	var token = jwt.sign(userInfo, config.secret, {
		expiresIn: config.expiration
	});

	return "JWT " + token;
}

exports.validToken = function (req) {
	var status = false;
	var token = req.body.token;

	jwt.verify(token, config.secret, function (err, decoded) {
		if (!err) {
			status = true;
		}
	});

	return status;
};

function getUserFor(req) {
	var user;

	switch (req.body.email) {
		case "utah@point.com":
		case "bodi@point.com":
			user = { email: req.body.email };
			break;
	}

	return user;
}