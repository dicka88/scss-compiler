require("dotenv").config();
const cssnano = require("cssnano");
const purgecss = require("@fullhuman/postcss-purgecss");
const postImport = require('postcss-import')

const isDev = process.env.environment === "development";

const purge = () => {
	if (isDev) return null;
	return purgecss({
		content: ["./views/**/*.ejs"],
		defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
	});
};

module.exports = {
	plugins: [postImport(), require("tailwindcss"), require("autoprefixer"), cssnano({ present: "default" }), purge()],
};