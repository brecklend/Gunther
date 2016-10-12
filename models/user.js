const	mongoose = require("mongoose"),
		Schema = mongoose.Schema,
		bcrypt = require("bcrypt-nodejs");

const UserSchema = new Schema({
	email: {
		type: String,
		lowercase: true,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	profile: {
		firstname: {
			type: String
		},
		lastname: {
			type: String
		}
	},
	role: {
		type: String,
		enum: ["Member", "Client", "Owner", "Admin"],
		default: "Member"
	},
	resetPasswordToken: {
		type: String
	},
	resetPasswordExpires: {
		type: Date
	}
},
{
	timestamps: true
});

UserSchema.pre("save", function (next) {
	const user = this;
	const SALT_FACTOR = 5;

	if (!user.isModified("password")) {
		return next();
	}

	bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
		if (err) {
			return next(err);
		}

		bcrypt.hash(user.password, salt, null, function (err, hash) {
			if (err) {
				return next(err);
			}

			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.comparePassword = function (candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
		if (err) {
			return callback(err);
		}

		callback(null, isMatch);
	});
};

module.exports = mongoose.model("User", UserSchema);