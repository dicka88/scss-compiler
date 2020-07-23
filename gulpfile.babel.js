import { dest, src, series } from "gulp";
import babel from "gulp-babel";
import uglifly from "gulp-uglyfly";
import tiny from "gulp-ejstiny";
import brotli from "gulp-brotli";

const js = () =>
  src("./src/assets/js/**/*.js")
  .pipe(babel())
  .pipe(uglifly())
  .pipe(brotli.compress())
  .pipe(dest("./public/js"));

const css = () =>
  src("./public/css/**/*.css")
  .pipe(brotli.compress())
  .pipe(dest("./public/css/"));

const svg = () =>
  src("./src/assets/images/**/*.svg")
  .pipe(brotli.compress())
  .pipe(dest("./public/images/"));

const ejs = () =>
  src("./src/views/**/*.ejs")
  .pipe(tiny({ removeComment: true }))
  .pipe(dest("./views/"));

export default series(ejs, js, css, svg);
