// Gulp
const gulp = require('gulp');

// Gulp helpers
const del = require('del');
const injectCSS = require('gulp-inject-css');
const injectJS = require('gulp-inject-js');
const webp = require('gulp-webp');
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
// SCSS
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

// Define relevant paths
const paths = {
	src: {
		html: './src/**/*.html',
		scripts: './src/**/*.js',
		styles: './src/styles/',
		//stylesheets: ['./src/**/*.css', './src/**/*.scss', './src/**/*.sass'],
		stylesheets: ['./src/**/*.scss'],
		images: ['./src/images/*.jpg', './src/images/*.png'],
	},
	html: './src/*.html',
	scripts: './src/*.js',
	styles: './src/styles/',
	//stylesheets: ['src/*.css', 'src/*.scss', 'src/*.sass'],
	stylesheets: ['src/*.scss'],
	images: ['./src/*.jpg', './src/*.png'],
	dest: './build/',
	imagedest: './build/images/'
};

// --- Build ---
gulp.task('build:clean', function (cb) {
	return del(paths.dest, cb);
});

gulp.task('build:sass', function () {
	return gulp.src('src/styles/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(paths.styles))
});

gulp.task('build:html', function (done) {
	return gulp.src('src/*.html')
		.pipe(injectCSS())
		.pipe(injectJS())
		.pipe(gulp.dest(paths.dest));
});

gulp.task('build:images', function (done) {
	return gulp.src(paths.images)
		.pipe(webp(
			imagemin(['src/images/*.{jpg,png}'], paths.imagedest, {
				use: [
					imageminWebp({
						quality: 70
					})
				]
			})))
		.pipe(gulp.dest(paths.imagedest));
});

// Build code
gulp.task('build', gulp.series('build:clean', 'build:sass', 'build:html', 'build:images'));

// Watch and rebuild when files change
gulp.task('watch', function () {
	gulp.watch(paths.src.html, gulp.series('build'));
	gulp.watch(paths.src.scripts, gulp.series('build'));
	gulp.watch(paths.src.stylesheets, gulp.series('build'));
	gulp.watch(paths.src.images, gulp.series('build'));
});

// Default task
gulp.task('default', gulp.parallel('build', 'watch'));