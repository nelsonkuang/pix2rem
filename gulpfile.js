// 引入 gulp
var gulp = require('gulp');

// 引入组件
var jshint = require('gulp-jshint'),            // 检查脚本
    sass = require('gulp-ruby-sass'),           // 编译Sass
    minifycss = require('gulp-minify-css'),     // css压缩
    autoprefixer = require('gulp-autoprefixer'),// 自动添加css3前缀
    concat = require('gulp-concat'),            // 合并
    uglify = require('gulp-uglify'),            // js压缩
    clean = require('gulp-clean'),              // 清空文件夹
    rename = require('gulp-rename');            // 重命名


// 检查脚本
gulp.task('jshint', function () {
    var jsSrc = './src/js/*.js',
        jsDst = './dist/js';
    gulp.src(jsSrc)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'));
});

// 编译Sass
gulp.task('sass', function () {
    var cssSrc = './src/scss/*.scss',
        cssDst = './dist/css';
    return sass(cssSrc, { style: 'expanded' })
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(cssDst))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest(cssDst));
});

// 压缩js文件
gulp.task('jsuglify', function () {
    var jsSrc = './src/js/*.js',
        jsDst = './dist/js';
    gulp.src(jsSrc)
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(jsDst));
});

// 合并,压缩js文件
gulp.task('jsconcat', function () {
    var jsSrc = './src/js/*.js',
        jsDst = './dist/js';
    gulp.src(jsSrc)
        .pipe(concat('all.js'))
        .pipe(gulp.dest(jsDst))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDst));
});

// 清空样式、js
gulp.task('clean', function () {
    gulp.src(['./dist/css', './dist/js'], { read: false })
        .pipe(clean());
});

// 默认任务
gulp.task('default', function () {
    gulp.run('jshint', 'sass', 'jsuglify');

    // 监听文件变化
    var jsSrc = './src/js/*.js',
        cssSrc = './src/scss/*.scss';
    gulp.watch([jsSrc, cssSrc], function () {
        gulp.run('jshint', 'sass', 'jsuglify');
    });
});
