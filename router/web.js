const { Router } = require("express");
const routes = Router();
/**
 * ________________________________________________
 *
 * Router
 * Route your world
 * _________________________________________________
 *
 */

routes.get("/", (req, res) => {
  res.render("pages/home");
});

routes.get("/css-scss", (req, res) => {
  res.render("pages/home");
});

routes.get("/sass-css", (req, res) => {
  res.render("pages/home");
});

routes.get("/css-sass", (req, res) => {
  res.render("pages/home");
});

module.exports = routes;
