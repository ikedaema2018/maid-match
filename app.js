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


var index = require('./routes/index');
var user_register = require('./routes/user_register');
var maid_register = require('./routes/maid_register');
var user_login = require('./routes/user_login');
var maid_login = require('./routes/maid_login');

var app = express();

//ログイン認証

// passport.serializeUser(function (user, done) {
//   done(null, user.userId);
//   console.log(user.userId);
// })

// passport.deserializeUser(function (user, done) {
//   done(null, user.userId);
//   console.log(user.userId);
// })

//passportのstrategy
// var LocalStrategy = require('passport-local').Strategy;
//認証機能
// passport.use(new LocalStrategy({
  //結果を返す
  // usernameField: 'user_id',
  // passwordField: 'password',
  // passReqToCallback: true,
  // session: false,
// }, function (req, user_id, password, done) {
  //postgresからユーザー情報読み出し
  // process.nextTick(function (){
    //データベースでuser_idとpasswordが一致するものを抽出
//   if(user_id === "test" && password === "test") {
//     return done(null, user_id)
//   } else {
//     console.log("login error")
//     return done(null,false)
//   }
// })

    // User.findOne({
    //   where: {
    //     userId: user_id, pass: password
    //   }
    // }).then((user) => {
    //   if (!user) {
    //     console.log("no");
    //     return done(null, false, {message: "ユーザーIDかパスワードが間違っています"})
    //   } else{
    //     console.log("ok")
    //   return done(null, user)
    // }})
// })}));

//passportのstrategy
var LocalStrategy = require('passport-local').Strategy;
//認証機能
passport.use(new LocalStrategy({
  //結果を返す
  usernameField: 'user_id',
  passwordField: 'password',
  passReqToCallback: true,
  // session: false,
}, function (req, user_id, password, done) {
  //postgresからユーザー情報読み出し
  process.nextTick(function (){
    User.findOne({
      where: {
        userId: user_id, pass: password
      }
    }).then((user) => {
      if (!user) {
        return done(null, false, {message: "ユーザーIDかパスワードが間違っています"})
      } else{
      return done(null, user.userId)
    }})
})
}));

passport.serializeUser(function (user, done) {
  done(null, user);
  console.log(user.userId);
})

passport.deserializeUser(function (user, done) {
  done(null, user);
})




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(passport.initialize());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.session());
// セッションの設定を行います.
app.use(session({

  // 必須項目（署名を行うために使います）
  secret : 'my-special-secret', 

  // 推奨項目（セッション内容に変更がない場合にも保存する場合にはtrue）
  resave : false,               
  
  // 推奨項目（新規にセッションを生成して何も代入されていなくても値を入れる場合にはtrue）
  saveUninitialized : true,                

  // アクセスの度に、有効期限を伸ばす場合にはtrue
  rolling : true,

  // クッキー名（デフォルトでは「connect.sid」）
  name : 'my-special-site-cookie',

  // 一般的なCookie指定
  // デフォルトは「{ path: '/', httpOnly: true, secure: false, maxAge: null }」
  cookie            : {
      // 生存期間（単位：ミリ秒）
      maxAge : 1000 * 60 * 60 * 24 * 30, // 30日
  }
}));

//認証よう
app.use((req, res, next) => {
  if(authorize() === true) {
    console.log("suru-");
    next();
  }else{
    switch(req.url){
      case '/':
      case '/user_login':
      case '/maid_login':
      // case '/user_register':
      // case '/maid_register':
        console.log("nodebug");
        next();
        break;
      default:
        console.log("naze");
        res.redirect("/user_login?err=1");
    }
  }
})

var authorize = function (role) {
  return function (request, response, next) {
      if (request.isAuthenticated() &&
          request.user.role === role) {
          return next();
      }
      response.redirect("/account/login");
  };
};

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
