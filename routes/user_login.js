var express = require('express');
var router = express.Router();
var passport = require('passport');



router.get('/', function(req, res, next) {
  res.render('user_login', {
    error: req.query.err ? "ユーザーIDもしくはpasswordが正しくありません" : "",
  });
})

// router.get('/?err=1', function(req, res, next) {
//   res.render('user_login', {
//     error: req.query.err ? "ユーザーIDもしくはpasswordが正しくありません" : "",
//   });
// })

router.post("/", (req, res, {}) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/user_login?err=1",
  }) (req, res)
})

module.exports = router;