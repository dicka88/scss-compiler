import {
  dest,
  src
} from 'gulp'
import babel from 'gulp-babel'
import uglifly from 'gulp-uglyfly'


export default () => src('./src/assets/js/**/*.js').pipe(babel()).pipe(uglifly()).pipe(dest('./public/js'))