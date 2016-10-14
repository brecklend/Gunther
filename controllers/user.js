"use strict";

const jwt = require("jsonwebtoken");
const auth = require("../utils/auth");

exports.login = function (req, res, next) {
	if (!auth.validUser(req)) {
		return res.status(401).json({
			error: "Unauthorized"
		});
	}

	res.status(200).json({
		token: auth.getTokenFor(req)
	});
};