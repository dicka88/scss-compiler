const { Router } = require("express");
const routes = Router();

const indexController = require("../controller/indexController");
const apiController = require("../controller/apiController");

routes.route("/").get(indexController.index);
routes.route("/scss-css").post(apiController.scssToCss);
routes.route("/sass-css").post(apiController.sassToCss);
routes.route("/css-scss").post(apiController.cssToScss);

module.exports = routes;
