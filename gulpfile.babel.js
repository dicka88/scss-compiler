import { dest, src, series } from "gulp";
import babel from "gulp-babel";
import uglifly from "gulp-uglyfly";
import minifyejs from "gulp-ejsmin";

const js = () =>
  src("./src/assets/js/**/*.js")
    .pipe(babel())
    .pipe(uglifly())
    .pipe(dest("./public/js"));

const ejs = () =>
  src("./src/views/**/*.ejs")
    .pipe(minifyejs({ removeComment: true }))
    .pipe(dest("./views/"));

export default series(ejs, js);
