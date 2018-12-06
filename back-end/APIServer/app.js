var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');


var MySQLStore = require('express-mysql-session')(session);


var mysql1 = require('/home/web/back_end/APIServer/db/DBConfig');

var app = express();
var identityKey = 'user';



app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  name: identityKey,
  secret: 'fqfqfq',  // 用来对session id相关的cookie进行签名
  store: new MySQLStore(mysql1.mysql),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
  saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
  resave: false,  // 是否每次都重新保存会话，建议false
  cookie: {
      maxAge: 60 * 1000  // 有效期，单位是毫秒
  }
}));
var indexRouter = require('/home/web/back_end/APIServer/routes/index');
var usersRouter = require('/home/web/back_end/APIServer/routes/users');
var leaveRouter = require('/home/web/back_end/APIServer/routes/leave');
var punchRouter = require('/home/web/back_end/APIServer/routes/punch');
var gooutRouter = require('/home/web/back_end/APIServer/routes/goout');
app.use('/', indexRouter);
app.use('/userid', usersRouter);
app.use('/leave',leaveRouter);
app.use('/punch',punchRouter);
app.use('/out',gooutRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
