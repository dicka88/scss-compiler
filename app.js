require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const expressStaticGzip = require('express-static-gzip')
const app = express();

/**
 * Load Router
 * use functional programming
 */
const apiRouter = require("./router/api");
const webRouter = require("./router/web");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.set("view engine", "ejs");

if (process.env.environment === "development") {
  app.set("views", path.join(__dirname, "./src/views"));
}

app.use("/", webRouter);

// app.use("/css", express.static("./public/css"));
// app.use("/images", express.static("./public/images"));
// app.use("/js", express.static("./public/js"));
// app.use("/", express.static("./public/other"));
const brotliOption = {
  enableBrotli: true,
  maxAge: 123,
  serveStatic: {
    maxAge: 234,
    cacheControl: false
  }
}
app.use("/css", expressStaticGzip("./public/css/", brotliOption));
app.use("/images", expressStaticGzip("./public/images/", brotliOption));
app.use("/js", expressStaticGzip("./public/js/", brotliOption));
app.use("/", expressStaticGzip("./public/other/", brotliOption));

app.use("/api", apiRouter);
app.use("*", (req, res) => res.status(404).render("pages/404"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server connected at " + port);
});
