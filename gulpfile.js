const gulp = require("gulp");

const sass = require('gulp-sass');
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

const babel = require("gulp-babel");
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');

const htmlmin = require("gulp-htmlmin");
const cssnano = require("gulp-cssnano");
const uglify = require("gulp-uglify");
const imagemin = require('gulp-imagemin');

const browserSync = require("browser-sync");
const server = browserSync.create();

const del = require("del");


// ******************************************************************
// Paths
// ******************************************************************

const paths = {
  styles: {
    src: "src/scss/**/*.scss",
    dest: "dist/"
  },
  scripts: {
    src: "src/js/**/*.js",
    dest: "dist/"
  },
  markup: {
    src: "src/html/**/*.html",
    dest: "dist/"
  },
  images: {
    src: 'src/images/*',
    dest: "dist/images/"
  }
};

// ******************************************************************
// Dev Tasks
// ******************************************************************

// HTML Pipe
function markup() {
  return gulp
    .src(paths.markup.src)
    .pipe(gulp.dest(paths.markup.dest));
}

// CSS Pipe
function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer({
      browsers: ["last 2 version"]
    })]))
    .pipe(sourcemaps.write('./maps/'))
    .pipe(rename({
      basename: 'styles'
    }))
    .pipe(gulp.dest(paths.styles.dest));
}

// JS Pipe
function scripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ["env"]
    }))
    .pipe(concat('index.js'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(paths.scripts.dest));
}

// ******************************************************************
// Production Tasks
// ******************************************************************

// HTML Min
function htmlmini() {
  return gulp
    .src(paths.markup.src)
    .pipe(htmlmin())
    .pipe(gulp.dest(paths.markup.dest));
}

// CSS Mini
function cssMini() {
  return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer({
      browsers: ["last 2 version"]
    })]))
    .pipe(cssnano())
    .pipe(sourcemaps.write('./maps/'))
    .pipe(rename({
      basename: 'styles'
    }))
    .pipe(gulp.dest(paths.styles.dest));
}

// JS Mini
function jsMini() {
  return gulp
    .src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ["env"]
    }))
    .pipe(concat('index.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(paths.scripts.dest));
}

// Images Compression
function images() {
  return gulp
    .src(paths.images.src)
    .pipe(imagemin({
      verbose: true
    }))
    .pipe(gulp.dest(paths.images.dest));
}

// ******************************************************************
// Dev Server Task
// ******************************************************************

function serverSetup(done) {
  server.init({
    server: {
      baseDir: "./dist"
    }
  });
  done();
}

function reload(done) {
  server.reload();
  done();
}

// ******************************************************************
// Clean
// ******************************************************************

// Delete dist folder
function clean(done) {
  del("./dist");
  done();
}

// ******************************************************************
// Watch Task
// ******************************************************************

function watch() {
  // Watch JS
  gulp.watch(paths.scripts.src, gulp.series(scripts, reload));
  // Watch CSS
  gulp.watch(paths.styles.src, gulp.series(styles, reload));
  // Watch HTML
  gulp.watch(paths.markup.src, gulp.series(markup, reload));
  // Watch Images
  gulp.watch(paths.images.src, gulp.series(images, reload));
}

// ******************************************************************
// Scripts
// ******************************************************************

// Build files without compression.
const dev = gulp.parallel(markup, styles, scripts, images);
// Start up dev server and watch files.
const setup = gulp.series(serverSetup, watch);
// Start build files, start server and watch.
const start = gulp.series(dev, setup);

// Build files with compression.
const build = gulp.series(htmlmini, cssMini, jsMini, images);

gulp.task('default', start);
gulp.task('build', build);
gulp.task('clean', clean);