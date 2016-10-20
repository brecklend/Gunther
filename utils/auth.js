"use strict";

const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("../config/main");

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