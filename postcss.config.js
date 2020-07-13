require("dotenv").config();
const cssnano = require("cssnano");
const purgecss = require("@fullhuman/postcss-purgecss");

const isDev = process.env.environment === "development";

const purge = () => {
  if (isDev) return null;
  return purgecss({
    content: ["./src/views/**/*.ejs"],
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    whitelist: ["ace_scrollbar"],
  });
};

module.exports = {
  plugins: [
    require("postcss-import"),
    require("tailwindcss"),
    require("autoprefixer"),
    cssnano({ present: "default" }),
    purge(),
  ],
};