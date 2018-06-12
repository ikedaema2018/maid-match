var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');


//モデルの読み込み
var User = require('./models/user');
User.sync();

var Maid = require('./models/maid');
Maid.sync();

//ログイン認証


var index = require('./routes/index');
var user_register = require('./routes/user_register');
var maid_register = require('./routes/maid_register');
var user_login = require('./routes/user_login');
var maid_login = require('./routes/maid_login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());



//passportのstrategy
var LocalStrategy = require('passport-local').Strategy;
//認証機能
passport.use(new LocalStrategy({
  //結果を返す
  usernameField: 'user_id',
  passwordField: 'password',
  passReqToCallback: true,
  session: false,
}, function (req, user_id, password, done) {
  //postgresからユーザー情報読み出し
  process.nextTick(function (){
  if(user_id === "test" && password === "test") {
    return done(null, user_id)
  } else {
    console.log("login error")
    return done(null,false)
  }
})
}));

passport.serializeUser(function (user, done) {
  done(null, user);
})

passport.deserializeUser(function (user, done) {
  done(null, user);
})
  

app.use('/', index);
app.use('/user_register', user_register);
app.use('/maid_register', maid_register);
app.use('/user_login', user_login);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
