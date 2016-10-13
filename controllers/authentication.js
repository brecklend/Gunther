"use strict";

const	jwt = require("jsonwebtoken"),
		crypto = require("crypto"),
		User = require("../models/user"),
		config = require("../config/main");

const auth = require("../utils/auth");

function generateToken (user) {
	return jwt.sign(user, config.secret, {
		expiresIn: 10080
	});
}

function setUserInfoProd (req) {
	return {
		_id: req._id,
		firstname: req.profile.firstname,
		lastname: req.profile.lastname,
		email: req.email,
		role: req.role
	};
}

function setUserInfo(req) {
	return {
		_id: "1",
		firstname: "John",
		lastname: "Doe",
		email: "me@email.com",
		role: "Admin"
	};
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

function validUser(req) {
	var status = false;
	var email = req.body.email;
	var password = req.body.password;

	switch (true) {
		case email == "utah@point.com" && password == "utahpwd":
			status = true;
			break;
		case email == "bodi@point.com" && password == "bodipwd":
			status = true;
			break;
	}

	return status;
}

exports.authenticateUser = function (req, res, next) {
	if (validUser(req)) {
		var user = getUserFor(req);
		
		var token = jwt.sign(user, config.secret, {
			expiresIn: 60
		});
		
		return res.status(200).json({
			token: "JWT " + token
		});	
	}
	
	res.status(401).json({
		error: "Unauthorized"
	});
}

exports.authenticateToken = function (req, res, next) {
	var token = req.body.token;
	
	jwt.verify(token, config.secret, function (err, decoded) {
		if (!err) {
			res.status(200).json({
				decoded: decoded
			});

			// next();
		}
		else {
			res.status(401).json({
				error: "Unauthorized"
			});
		}
	});
}








exports.login = function (req, res, next) {
	console.log("login");
	var email = req.body.email;
	var password = req.body.password;
	console.log("email", email, " password", password);

	if (email == "me@email.com" && password == "pwd") {
		console.log("correct user credentials");

		// let userInfo = setUserInfo(req.user);
		let userInfo = setUserInfo(null);
		console.log("userInfo", userInfo._id);

		var token = auth.generateTokenFor(userInfo);

		res.status(200).json({
			token: "JWT " + token,
			user: userInfo
		});
	}

	res.status(401).send({
		error: "Unauthorized"
	});
};

exports.loginProd = function (req, res, next) {
	let userInfo = setUserInfo(req.user);

	res.status(200).json({
		token: "JWT " + generateToken(userInfo),
		user: userInfo
	});
};

exports.register = function (req, res, next) {
	var email = req.body.email;
	var password = req.body.password;

	if (email == "me@email.com" && password == "Password#1") {
		let user = new User({
			email: email,
			password: password,
			profile: {
				firstname: "John",
				lastname: "Doe"
			}
		});

		let userInfo = setUserInfo(user);

		res.status(201).json({
			token: "JWT " + generateToken(userInfo),
			user: userInfo
		});
	}
	
	return res.status(401).send({
		error: "You are not authorized"
	});
};

exports.registerProd = function (req, res, next) {
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

		// To prevent non-authorized users from registering
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