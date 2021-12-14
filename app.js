"use strict";

// A plain, node-style app
function myPlainNodeHttpApp(req, res) {
	res.end("Hello, Encrypted World!");
}

// Wrap that plain app in express,
// because that's what you're used to

var express = require("express");
var app = express();
app.get("/", myPlainNodeHttpApp);

// export the app normally
// do not .listen()

module.exports = app;
