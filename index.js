const	express = require("express"),
		app = express(),
		bodyParser = require("body-parser"),
		logger = require("morgan"),
		mongoose = require("mongoose"),
		config = require("./config/main"),
		cors = require("./utils/cors"),
		router = require("./router");

const server = app.listen(config.port);
console.log("Server running on port", config.port);

app.use(logger("dev"));

app.use(cors());

// Database
//mongoose.connect(config.database);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router(app);