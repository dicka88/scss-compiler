require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();

/**
 * Load Router
 * use functional programming
 */
const apiRouter = require("./router/index");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("pages/home");
});

app.use("/css", express.static("./public/css"));
app.use("/images", express.static("./public/images"));
app.use("/js", express.static("./public/js"));

app.use("/api", apiRouter);
app.use("*", (req, res) => res.status(404).send("not found boy"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log("server connected at " + port);
});
