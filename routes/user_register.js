var express = require('express');
var router = express.Router();
const User = require('../models/user');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user_register', {title: 'Maider'});
});

router.post('/', (req, res, next) => {
  User.create({
    id: null,
    name: req.body.name,
    userId: req.body.user_id,
    pass: req.body.pass,
    age: req.body.age,
    gender: req.body.gender,
    job: req.body.job,
    income: req.body.income,
    appeal: req.body.appeal
  })
  res.redirect("/user_login");
})



module.exports = router;
