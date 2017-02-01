const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const useref = require('gulp-useref');
const gulpIf = require('gulp-if');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const jshint = require('gulp-jshint');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
const annotate = require('gulp-ng-annotate');

const bases = {
    app: 'app/',
    dist: 'dist/',
};

const paths = {
    scripts: ['public/js/angular-scripts/**/*.js'],
    styles: ['public/css/**/*.css'],
    hbs: ['views/**/*.hbs'],
    images: ['public/images/**/*.svg'],
};

// Delete the dist directory
gulp.task('clean', function() {
    return gulp.src(bases.dist)
        .pipe(clean());
});

// Process scripts and concatenate them into one output file
gulp.task('jsmin', () => {
    return gulp.src(paths.scripts, {
            cwd: bases.app
        })
        .pipe(annotate())
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest(bases.dist + 'js/'));
});

// Process css and concatenate them into one output file
gulp.task('cssmin', () => {
    return gulp.src(paths.styles, {
            cwd: bases.app
        })
        .pipe(cssnano())
        .pipe(concat('css.min.css'))
        .pipe(gulp.dest(bases.dist + 'css/'));
});

// Imagemin images and ouput them in dist
gulp.task('imagemin', () => {
    return gulp.src(paths.images, {
            cwd: bases.app
        })
        .pipe(imagemin())
        .pipe(gulp.dest(bases.dist + 'images/'));
});

gulp.task('hbs', function() {
    return gulp.src('app/views/**/*.hbs')
        .pipe(useref({
            searchPath: 'app/public/',
            base: './dist/public/'
        }))
        .pipe(gulpIf('*.css', cssnano({
            zindex: false
        })))
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulp.dest('dist'));
});

// Define the default task as a sequence of the above tasks
gulp.task('build', ['clean', 'jsmin', 'cssmin', 'imagemin']);
