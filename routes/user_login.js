var express = require('express');
var router = express.Router();
var passport = require('passport');

console.log("test");
router.get('/', function(req, res, next) {
  res.render('user_login', {});
})

router.post("/", (req, res, {}) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login?err=1",
  }) (req, res)
})

module.exports = router;