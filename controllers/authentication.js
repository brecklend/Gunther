"use strict";

const	jwt = require("jsonwebtoken"),
		crypto = require("crypto"),
		User = require("../models/user"),
		config = require("../config/main");

function generateToken (user) {
	return jwt.sign(user, config.secret, {
		expiresIn: 10080
	});
}

function setUserInfo (req) {
	return {
		_id: req._id,
		firstname: req.profile.firstname,
		lastname: req.profile.lastname,
		email: req.email,
		role: req.role
	};
}

exports.login = function (req, res, next) {
	let userInfo = setUserInfo(req.user);

	res.status(200).json({
		token: "JWT " + generateToken(userInfo),
		user: userInfo
	});
};

exports.register = function (req, res, next) {
	console.log("in register controller");
	const email = req.body.email;
	const firstName = req.body.firstname;
	const lastName = req.body.lastname;
	const password = req.body.password;

	if (!email) {
		return res.status(422).send({
			error: "Your email is required"
		});
	}

	if (!firstName || !lastName) {
		return res.status(422).send({
			error: "Your full name is required"
		});
	}

	if (!password) {
		return res.status(422).send({
			error: "You must provide a password"
		});
	}

	User.findOne({ email: email }, function (err, existingUser) {
		if (err) {
			return next(err);
		}

		if (existingUser) {
			return res.status(422).send({
				error: "That email address is already in use"
			});
		}

		if (email != "preRegistered@email.com") {
			return res.status(401).send({
				error: "You are not authorized"
			});
		}

		let user = new User({
			email: email,
			password: password,
			profile: {
				firstname: firstName,
				lastname: lastName
			}
		});

		user.save(function (err, user) {
			if (err) {
				return next(err);
			}

			let userInfo = setUserInfo(user);

			res.status(201).json({
				token: "JWT " + generateToken(userInfo),
				user: userInfo
			});
		});
	});
};

exports.roleAuthorization = function (role) {
	return function (req, res, next) {
		const user = req.user;

		User.findById(user._id, function (err, foundUser) {
			if (err) {
				res.status(422).json({
					error: "No user was found"
				});

				return next(err);
			}

			if (foundUser.role != role) {
				res.status(401).json({
					error: "You are not authorized"
				});

				return next("Unauthorized");
			}

			return next();
		});
	};
};

exports.forgotPassword = function () {
	//
};

exports.resetPassword = function () {
	//
};