"use strict";

const jwt = require("jsonwebtoken");
const auth = require("../utils/auth");

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