var gulp = require('gulp');
var webserver = require('gulp-webserver');
var mainBowerFiles = require('main-bower-files');
var inject = require('gulp-inject');
var pak = require('del');

var masir = {
	temp: 'temp/',
	tempVendor: 'temp/vendor/',
	tempIndex: 'temp/index.html',

	index: 'app/index.html',
	appSrc: ['app/**/*', '!app/index.html'],
	bowerSrc: 'public/lib/**/*'
};

gulp.task('default', ['negah']);

gulp.task('negah', ['serve'], function() {
	gulp.watch(masir.appSrc, ['scripts']);
	gulp.watch(masir.bowerSrc, ['vendors']);
	gulp.watch(masir.index, ['copyAll']);

});

gulp.task('serve', ['copyAll'], function() {
	gulp.src(masir.temp)
		.pipe(webserver({
			livereload: true,
			port: 3000,
			proxies: [{
				source: '/api',
				target: 'http://localhost:1337'
			}]
		}));
});

gulp.task('copyAll', function() {
	var tempVendors = gulp.src(mainBowerFiles()).pipe(gulp.dest(masir.tempVendor));

	var appFiles = gulp.src(masir.appSrc).pipe(gulp.dest(masir.temp));

	return gulp.src(masir.index)
		.pipe(gulp.dest(masir.temp))
		.pipe(inject(tempVendors, {
			relative: true,
			name: 'vendorInject'
		}))
		.pipe(inject(appFiles, {
			relative: true
		}))
		.pipe(gulp.dest(masir.temp));
});

gulp.task('vendors', function() {
	var tempVendors = gulp.src(mainBowerFiles()).pipe(gulp.dest(masir.tempVendor));

	return gulp.src(masir.tempIndex)
		.pipe(inject(tempVendors, {
			relative: true,
			name: 'vendorInject'
		}))
		.pipe(gulp.dest(masir.temp));
});

gulp.task('scripts', function() {

	var appFiles = gulp.src(masir.appSrc).pipe(gulp.dest(masir.temp));

	return gulp.src(masir.tempIndex)
		.pipe(inject(appFiles, {
			relative: true
		}))
		.pipe(gulp.dest(masir.temp));
});

gulp.task('tamiz', function() {
	pak([masir.temp]);
});