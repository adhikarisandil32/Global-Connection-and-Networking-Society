const gulp = require("gulp")
const sass = require("gulp-sass")(require("sass"))

function buildStyles() {
  return gulp
    .src("src/style.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./dest/"))
}

function watchTask() {
  gulp.watch(["src/*"], buildStyles)
}

exports.default = gulp.series(buildStyles, watchTask)

//on the terminal, use 'gulp' command
