"use strict";

const express = require("express");
const app = express();
const Greenlock = require("greenlock");
const greenlock = Greenlock.create({
	packageRoot: __dirname,
	configDir: "./greenlock.d/",
	maintainerEmail: "marko@digitalinfinity.rs",
	staging: true,
	notify: function (event, details) {
		if ("error" === event) {
			// `details` is an error object in this case
			console.error(details);
		}
	},
});
greenlock.manager.defaults({
	// The "Let's Encrypt Subscriber" (often the same as the maintainer)
	// NOT the end customer (except where that is also the maintainer)
	subscriberEmail: "marko@digitalinfinity.rs",
	agreeToTerms: true,
	challenges: {
		"http-01": {
			module: "acme-http-01-standalone",
		},
	},
});
function myPlainNodeHttpApp(req, res) {
	res.end("Hello, Encrypted World!");
}
function add(req, res) {
	greenlock
		.add({
			subject: "cekicm.xyz",
			altnames: ["cekicm.xyz", "www.cekicm.xyz"],
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
app.listen(80, 443);
module.exports = app;
