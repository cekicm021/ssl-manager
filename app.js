"use strict";

const express = require("express");
const app = express();
const Greenlock = require("greenlock");
const greenlock = Greenlock.create({
	packageRoot: __dirname,

	// contact for security and critical bug notices
	maintainerEmail: "marko@digitalinfinity.rs",

	// where to look for configuration
	configDir: "./greenlock.d",

	// whether or not to run at cloudscale
	cluster: false,
});

function myPlainNodeHttpApp(req, res) {
	res.end("Hello, Encrypted World!");
}
function add(req, res) {
	greenlock
		.add({
			subject: "cekicm.xyz",
			altnames: ["cekicm.xyz","www.cekicm.xyz"],
		})
		.then((response) => {
			res.send(response);
		});
}
app.get("/", myPlainNodeHttpApp);

app.get("/add", add);
app.get("/test", (req, res) => {
	res.send({ msg: "test" });
});

// if (require.main === module) {
// 	app.listen(3000);
// }

// export the app normally
// do not .listen()
app.listen(80,443);
module.exports = app;
