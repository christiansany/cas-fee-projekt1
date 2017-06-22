import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import cleanCSS from 'gulp-clean-css';
import webpack from 'gulp-webpack';
import named from 'vinyl-named';
import del from 'del';

const dirs = {
    src: 'public/src',
    dest: 'public/build'
};

export const cleanStatic = () => {
    return del(dirs.dest);
};

const stylesPaths = {
    src: [
        `${dirs.src}/styles/main.scss`
    ],
    watch: `${dirs.src}/styles/**/*`,
    dest: `${dirs.dest}/styles/`
};

export const buildStyles = () => {
    return gulp.src(stylesPaths.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(stylesPaths.dest));
};

const scriptsPaths = {
    src: [
        `${dirs.src}/scripts/app.js`
    ],
    watch: `${dirs.src}/scripts/**/*`,
    dest: `${dirs.dest}/scripts/`
};

export const buildScripts = () => {
    return gulp.src(scriptsPaths.src)
        .pipe(named())
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest(scriptsPaths.dest));
};

const fontsPaths = {
    src: `${dirs.src}/assets/fonts/**/*`,
    watch: `${dirs.src}/assets/fonts/**/*`,
    dest: `${dirs.dest}/assets/fonts/`
};

export const copyFonts = () => {
    return gulp.src(fontsPaths.src)
        .pipe(gulp.dest(fontsPaths.dest));
};

const templatePaths = {
    src: `${dirs.src}/templates/**/*`,
    watch: `${dirs.src}/templates/**/*`,
    dest: `${dirs.dest}/templates/`
};

export const copyTemplates = () => {
    return gulp.src(templatePaths.src)
        .pipe(gulp.dest(templatePaths.dest));
};

// Build task
export const build = gulp.series(cleanStatic, gulp.parallel(
    buildStyles,
    copyTemplates,
    buildScripts,
    copyFonts
));

// Watch task
export const watch = gulp.series(() => {
    gulp.watch(stylesPaths.watch, gulp.parallel(buildStyles));
    gulp.watch(scriptsPaths.watch, gulp.parallel(buildScripts));
    gulp.watch(fontsPaths.watch, gulp.parallel(copyFonts));
    gulp.watch(templatePaths.watch, gulp.series(copyTemplates, buildScripts));
});

export default gulp.series(build, watch);
