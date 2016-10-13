"use strict";

const jwt = require("jsonwebtoken");
const auth = require("../utils/auth");

// exports.getSearches = function (req, res, next) {
// 	console.log("getSearches");
// 	var token = req.body.token;
// 	console.log("token", token);
// 	//var verified = auth.validate(token);
// 	res.status(200).json({
// 		message: "Here are your searches"
// 	});
// };

exports.getAll = function (req, res, next) {
	res.status(200).json({
		search: "Some kinda search"
	});
};

exports.add = function (req, res, next) {
	res.status(200).json({
		message: "Successfully added search"
	});
};

exports.delete = function (req, res, next) {
	res.status(200).json({
		message: "Successfully deleted search"
	});
};