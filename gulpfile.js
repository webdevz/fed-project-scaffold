// Gulp
const gulp = require('gulp');

// Gulp helpers
const insert = require('gulp-insert');
const sequence = require('gulp-sequence');
const glob = require('glob');
const es = require('event-stream');
const del = require('del');
const injectCSS = require('gulp-inject-css');
const injectJS = require('gulp-inject-js');

// Define relevant paths
const paths = {
	src: {
		html: './src/**/*.html',
		scripts: './src/**/*.js',
		stylesheets: ['./src/**/*.css', './src/**/*.scss', './src/**/*.sass'],
	},
	html: './src/*.html',
	scripts: './src/*.js',
	stylesheets: ['src/styles/*.css', 'src/styles/*.scss', 'src/styles/*.sass'],
	dest: './build/',
};

// --- Build ---
gulp.task('build:clean', (cb) => {
	return del(paths.dest, cb);
});

gulp.task('build:html', (done) => {
	glob(paths.html, (err, files) => {
		if (err) done(err);

		/*gulp.src('src/*.html')
			.pipe(injectCSS())
			.pipe(gulp.dest(paths.dest));*/
		  
		const tasks = files.map(entry => {
			return gulp.src('src/*.html')
				.pipe(injectCSS())
				.pipe(injectJS())
				.pipe(gulp.dest('build'))
				.pipe(gulp.dest(paths.dest));
		});

		es.merge(tasks).on('end', done);
	});
});

// Build experiment
gulp.task('build', () => {
	return sequence('build:clean', 'build:html')();
});

// Watch and rebuild when experiment files change
gulp.task('watch', () => {
	gulp.watch(paths.src.html, ['build']);
	gulp.watch(paths.src.scripts, ['build']);
	gulp.watch(paths.src.stylesheets, ['build']);
});

// Default task
gulp.task('default', ['build', 'watch']);