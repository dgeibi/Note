---
title: Gulp
---

## gulp.src(globs[, options])

返回一个符合 globs 的，通过 [Vinyl](https://github.com/gulpjs/vinyl-fs) 得到的 [stream](https://nodejs.org/api/stream.html)。

``` javascript
gulp.src('client/templates/*.jade')
  .pipe(jade())
  .pipe(minify())
  .pipe(gulp.dest('build/minified_templates'));
```

在 Unix 系统下，glob 表达式用于指定文件名。详见 [glob (programming) - Wikipedia](https://en.wikipedia.org/wiki/Glob_(programming))

参数中的 globs 可以是 `'*.js'`，`['*.js','*.css']`，即可以是 glob 字符串，也可以是 glob 数组。

然而，各平台的 glob 实现存在差异。

gulp 加前面加 `!b*.js`，排除在它之前的数组符合 `b*.js` 的文件。

`gulp.src(['client/*.js', '!client/b*.js', 'client/bad.js'])` 匹配 'client/bad.js'，不匹配 'client/bb.js' 等。


支持所有的 [node-glob](https://github.com/isaacs/node-glob#options) 和 [glob-stream](https://github.com/gulpjs/glob-stream#options) 的 option（不包括 `ignore`）

还包括 buffer, read, base

- buffer：Boolean，默认 true。如果该项被设置为 false，那么将会以 stream 方式返回 file.contents 而不是文件 buffer 的形式。这在处理一些大文件的时候将会很有用。（WWW）
- read：Boolean，默认 true。如果该项被设置为 false， 那么 file.contents 会返回空值（null），也就是并不会去读取文件。（WWW）
- base：String，基准，默认为文件所在目录或者第一个通配符前的目录，如 'a/b/c/hello.js' 的 base 为 `a/b/c`。如果指定 base 为 `a`，那么 后续的路径，将以 `a` 为基准，而不是默认的 `a/b/c`。

## gulp.dest(path[, options])

将管道导向 `path`，写入文件，管道并不会因此中断。

``` javascript
gulp.src('./client/templates/*.jade')
  .pipe(jade())
  .pipe(gulp.dest('./build/templates'))
  .pipe(minify())
  .pipe(gulp.dest('./build/minified_templates'));
```

path：输出的目录。

``` javascript
options = { cwd, mode }
```

cwd: String，默认 process.cwd()。

mode: String，权限，参见 unix 的 chmod。


## gulp.task(name [, deps] [, fn])

定义任务。

- name：String，任务名。
- deps：Array，依赖任务名数组，执行**完**所有依赖任务之后，fn 才会执行，deps 内所有任务如果无依赖关系，则会并发进行。
- fn：Function，任务的主要操作。

gulp 默认追求最大的并发，如果要控制多个任务的执行顺序，需要明确依赖关系。deps，不要写漏了。

### 如何处理异步操作

如果一个任务的依赖同步的，不需要担心，因为 gulp 始终在执行完依赖之后，继续执行。但是，如果依赖的任务是异步的，即执行之后立刻有返回值，实际的任务放到任务列队中，需要一种机制提醒 gulp 任务的完成情况。

1. 通过 callback(err)
2. 返回一个 promise
3. 返回一个 stream

callback 的方式：

``` javascript
var gulp = require('gulp');

// 传入一个回调函数，因此引擎可以知道何时它会被完成
gulp.task('one', function(callback) {
    // 做一些事 -- 异步的或者其他任何的事
    callback(err); // 如果 err 不是 null 和 undefined，流程会被结束掉，'two' 不会被执行
});

// 标注一个依赖，依赖的任务必须在这个任务开始之前被完成
gulp.task('two', ['one'], function() {
    // 现在任务 'one' 已经完成了
});

gulp.task('default', ['one', 'two']);
// 也可以这么写：gulp.task('default', ['two']);
```

返回 stream：

``` javascript
var gulp = require('gulp');
var del = require('del'); // https://www.npmjs.com/package/del

gulp.task('clean', function() {
    return del(['output']); // return a promise
});

gulp.task('clean:sync', function() {
    del.sync(['output']); // 阻塞的任务
});

gulp.task('templates', ['clean'], function() {
    var stream = gulp.src(['src/templates/*.hbs'])
        // 执行拼接，压缩，等。
        .pipe(gulp.dest('output/templates/'));
    return stream; // 返回一个 stream 来表示它已经被完成
});

gulp.task('styles', ['clean'], function() {
    var stream = gulp.src(['src/styles/app.less'])
        // 执行一些代码检查，压缩，等
        .pipe(gulp.dest('output/css/app.css'));
    return stream;
});

gulp.task('build', ['templates', 'styles']);

// templates 和 styles 将会并行处理
// clean 将会保证在任一个任务开始之前完成
// clean 并不会被执行两次，尽管它被作为依赖调用了两次

gulp.task('default', ['build']);
```

## gulp.watch(globs[, opts], tasks)

监控符合 globs 的文件变化。

- globs: String, Array，见 gulp.src
- tasks: Array，文件变化之后执行的任务

返回一个发射 change 事件的 EventEmitter 的实例。

``` javascript
var watcher = gulp.watch('js/**/*.js', ['uglify','reload']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
```

## gulp.watch(globs[, opts, cb])

``` javascript
gulp.watch('js/**/*.js', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
```

- event.type: 可以是 added, changed, deleted or renamed.
- event.path: 触发事件的文件路径。

check

- [gulp/API.md at master · gulpjs/gulp](https://github.com/gulpjs/gulp/blob/master/docs/API.md)
- [gulp.js 中文网](http://www.gulpjs.com.cn/docs/api/)
