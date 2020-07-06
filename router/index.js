const { Router } = require("express");
const sass = require("node-sass");
const routes = Router();

const indexController = require("../controller/indexController");

routes.route("/").get(indexController.index);

routes.route("/scss-css").post((req, res) => {
	const stringSass = req.body.string;

	if (!stringSass) return res.status(404).send("not found");

	try {
		const compile = sass.renderSync({
			data: stringSass,
			indentedSyntax: true,
			outputStyle: "expanded",
		});
		res.send(compile.css.toString());
	} catch (e) {
		res.send(e.formatted);
	}
});

routes.route("/css-scss").post((req, res) => {
	res.send("css to scss");
});

module.exports = routes;
