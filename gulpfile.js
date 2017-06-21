var gulp=require('gulp'),
	less=require('gulp-less'),
	autoprefixer = require('gulp-autoprefixer'),
    cssmin=require('gulp-clean-css'),
    uglify= require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin');


//自定义任务名称
// less转为css 
gulp.task('testless',function(){
	gulp.src('./public/less/*.less')
	.pipe(less())
	.pipe(gulp.dest('./public/style/css'))
   
});

//加前缀src/cssall 并css压缩
gulp.task('testAutoFx', function () {
    gulp.src('./public/style/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(gulp.dest('./public/style/cssautofx'))
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/public/style'))
});

// ****************压缩js
gulp.task('jsmin', function () {
    //压缩src/js目录下的所有js文件
    //除了test1.js和test2.js（**匹配src/js的0个或多个子文件夹）
     // gulp.src(['src/js/*.js', '!src/js/**/{test1,test2}.js']) 
    gulp.src(['./public/script/js/*.js']) 
        .pipe(uglify())
        .pipe(gulp.dest('./dist/public/script'));
});

// ****************压缩html 
gulp.task('testHtmlmin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('./views/html/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('./dist/views'));
});

gulp.task('watch', function () {
    gulp.watch('./public/less/*.less', ['testless']);
    gulp.watch('./public/style/css/*.css', ['testAutoFx']);
    gulp.watch('./views/html/*.html', ['testHtmlmin']);
    gulp.watch('./public/script/js/*.js', ['jsmin']);
});

 //定义默认任务
 gulp.task('default',['testAutoFx','testHtmlmin','jsmin','watch']);




