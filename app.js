"use strict";
const { exec } = require("child_process");
// A plain, node-style app
function myPlainNodeHttpApp(req, res) {
	res.end("Hello, Encrypted World!");
}

// Wrap that plain app in express,
// because that's what you're used to

var express = require("express");
var app = express();
app.get("/", myPlainNodeHttpApp);
app.get("/add", (req, res) => {
	let subject = req.query.subject;
	exec(
		`npx greenlock add --subject ${subject} --altnames ${subject},www.${subject}`,
		(err, stdout, stderr) => {
			if (err) {
				console.log(err.message);
				return;
			}
			if (stderr) {
				console.log(stderr);
				return;
			}
			console.log(stdout);
		}
	);
});
// export the app normally
// do not .listen()

module.exports = app;
