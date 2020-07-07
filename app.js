require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();

/**
 * Load Router
 * use functional programming
 */
const indexRouter = require("./router/index");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
	res.sendFile("./views/index.html", { root: __dirname });
});

app.use("/css", express.static("./public/css"));
app.use("/api", indexRouter);
app.use("*", (req, res) => res.status(404).send("not found boy"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log("server connected at " + port);
});
