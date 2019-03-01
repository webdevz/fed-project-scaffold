// Gulp
const gulp = require('gulp');

// Gulp helpers
//const insert = require('gulp-insert');
//const sequence = require('gulp-sequence');
//const glob = require('glob');
//const es = require('event-stream');
const del = require('del');
const injectCSS = require('gulp-inject-css');
const injectJS = require('gulp-inject-js');
const webp = require('gulp-webp');
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

// Define relevant paths
const paths = {
	src: {
		html: './src/**/*.html',
		scripts: './src/**/*.js',
		stylesheets: ['./src/**/*.css', './src/**/*.scss', './src/**/*.sass'],
		images: ['./src/images/*.jpg', './src/images/*.png'],
	},
	html: './src/*.html',
	scripts: './src/*.js',
	stylesheets: ['src/*.css', 'src/*.scss', 'src/*.sass'],
	images: ['./src/*.jpg', './src/*.png'],
	dest: './build/',
	imagedest: './build/images/'
};

// --- Build ---
gulp.task('build:clean', function(cb) {
	return del(paths.dest, cb);
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
					imageminWebp({quality: 70})
				]
			})))
		.pipe(gulp.dest(paths.imagedest))
});

// Build code
gulp.task('build', gulp.series('build:clean', 'build:html', 'build:images'));

// Watch and rebuild when files change
gulp.task('watch', function () {
	gulp.watch(paths.src.html, gulp.series('build'));
	gulp.watch(paths.src.scripts, gulp.series('build'));
	gulp.watch(paths.src.stylesheets, gulp.series('build'));
	gulp.watch(paths.src.images, gulp.series('build'));
});

// Default task
gulp.task('default', gulp.parallel('build', 'watch'));