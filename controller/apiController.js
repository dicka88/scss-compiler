const sass = require("node-sass");
const styleflux = require("styleflux");

class Api {
  constructor() {

  }

  static scssToCss(req, res) {
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
  }

  static sassToCss(req, res) {
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
  }

  static cssToScss(req, res) {
    const stringCss = req.body.string;
    console.log(stringCss);

    if (!stringCss) return res.status(404).send("not found");

    try {
      const compile = styleflux.cssToScss(stringCss);
      res.send(compile);
    } catch (e) {
      res.status(400).send(e);
    }
  }
}

module.exports = Api
