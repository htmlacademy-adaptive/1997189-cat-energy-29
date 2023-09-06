import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import squoosh from 'gulp-libsquoosh';
import svgstore from 'gulp-svgstore';
import svgo from 'gulp-svgmin';
import { deleteAsync } from 'del';
import { stacksvg } from "gulp-stacksvg";

export const makeStack = () => {
  return gulp.src('source/img/icons/**/*.svg')
  .pipe(stacksvg({output: 'sprite'}))
  .pipe(gulp.dest('build/img/iconsStack'));
};

export const clean = () => {
  return deleteAsync('build');
  };

  /*function clean() { }*/

export const styles = () => {
  return gulp.src('source/less/style.less', { sourcemaps: true })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe (rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
};

//HTML
const html = () => {
  return gulp.src('source/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
};

//Scripts
const scripts = () => {
  return gulp.src('source/js/*.js')
  .pipe(terser())
  .pipe(gulp.dest('build/js'));
};

//Images
const optimizeImages = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(squoosh())
  .pipe(gulp.dest('build/img'));
};

const copyImages = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(gulp.dest('build/img'));
};

//Svg
const svg = () => {
  return gulp.src (['source/img/**/*.svg','!source/img/icons/*.svg'])
  .pipe(svgo())
  .pipe(gulp.dest('build/img'));
};

const sprite = () => {
  return gulp.src ('source/img/icons/*.svg')
  .pipe(svgo())
  .pipe(svgstore ({
    inlineSvg: true
  }))
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('build/img'));
};

//шрифты, манифест
const copy = (done) => {
gulp.src([
"source/fonts/**/*.{woff2,woff}",
"source/*.ico",
/*"manifest.webmanifest",*/
], {
base: "source"
})
.pipe(gulp.dest('build'));
done();
};

//webp
const createWebp = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(squoosh({
    webp: {}
  }))
  .pipe(gulp.dest('build/img'));
};

 const reload = (done) => {
  browser.reload();
  done();
};

// Server
const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
    browser: "chrome"
  });
  done();
};

// Watcher

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series(styles));
  gulp.watch("source/js/script.js", gulp.series(scripts));
  gulp.watch("source/*.html", gulp.series(html, reload));
  };

export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel (
    styles,
    html,
    scripts,
    svg,
    sprite,
    makeStack,
    createWebp
  )
);

export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel (
    styles,
    html,
    scripts,
    svg,
    sprite,
    makeStack,
    createWebp
  ),
  gulp.series(
    server,
    watcher
));
