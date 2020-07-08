const { Router } = require("express");
const sass = require("node-sass");
const styleflux = require("styleflux");

const routes = Router();

const indexController = require("../controller/indexController");

routes.route("/").get(indexController.index);

routes.route("/scss-css").post((req, res) => {
	const stringSass = req.body.string;
	console.log(stringSass);

	if (!stringSass) return res.status(404).send("not found");

	try {
		const compile = sass.renderSync({
			data: stringSass,
			indentedSyntax: false, // true = sass. false = scss
			outputStyle: "expanded",
		});
		res.send(compile.css.toString());
	} catch (e) {
		res.send(e.formatted);
	}
});

routes.route("/sass-css").post((req, res) => {
	const stringSass = req.body.string;
	console.log(stringSass);

	if (!stringSass) return res.status(404).send("not found");

	try {
		const compile = sass.renderSync({
			data: stringSass,
			indentedSyntax: true, // true = sass. false = scss
			outputStyle: "expanded",
		});
		res.send(compile.css.toString());
	} catch (e) {
		res.send(e.formatted);
	}
});

routes.route("/css-scss").post((req, res) => {
	const stringCss = req.body.string;
	console.log(stringCss);

	if (!stringCss) return res.status(404).send("not found");

	try {
		const compile = styleflux.cssToScss(stringCss);
		res.send(compile);
	} catch (e) {
		res.status(400).send(e);
	}
});

module.exports = routes;
