"use strict";

const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("../config/main");

// module.exports.generateTokenFor = function(user) {
// 	console.log("user.email", user.email);
// 	var token = jwt.sign(user, config.secret, { expiresIn: 10080 });
// 	console.log("token", token);
// 	return res.send(token);
// 	// return jwt.sign(user, config.secret, {
// 	// 	expiresIn: 10080
// 	// });
// };

// module.exports.validate = function(token) {
// 	console.log("token", token);
// 	var verified = jwt.verify(token, config.secret);
// 	console.log("verified", verified);
// };

exports.validUser = function (user) {
	var status = false;
	var email = user.body.email;
	var password = user.body.password;

	switch (true) {
		case email == "utah@point.com" && passwod == "utahpwd":
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

exports.validToken = function (req, res, next) {

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