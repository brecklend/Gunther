const passport = require("passport");
const User = require("../models/user");
const config = require("./main");
const	JwtStategy = require("passport-jwt").Strategy,
		ExtractJwt = require("passport-jwt").ExtractJwt,
		LocalStrategy = require("passport-local");

const localOptions = { usernameField: "email" };

const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
	User.findOne({ email: email }, function (err, user) {
		if (err) {
			return done(err);
		}

		if (!user) {
			return done(null, false, { error: "Your login credentials could not be verified. Please try again." });
		}

		user.comparePassword(password, function (err, isMatch) {
			if (err) {
				return done(err);
			}

			if (!isMatch) {
				return done(null, false, { error: "Your email or password is incorrect. Please try again." });
			}

			return done(null, user);
		});
	});
});

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeader(),
	secretOrKey: config.secret
};

const jwtLogin = new JwtStategy(jwtOptions, function (payload, done) {
	console.log("payload", payload); // debug to make sure _id is correct property
	User.findById(payload._id, function (err, user) {
		if (err) {
			return done(err, false);
		}

		if (!user) {
			return done(null, false);
		}

		return done(null, user);
	});
});

passport.use(jwtLogin);
passport.use(localLogin);