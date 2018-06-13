var express = require('express');
var router = express.Router();
const Maid = require('../models/maid');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('maid_register', {title: 'Maider'});
});

router.post('/', (req, res, next) => {
  Maid.create({
    id: null,
    name: req.body.name,
    userId: req.body.user_id,
     pass: req.body.pass,
     age: req.body.age,
     gender: req.body.gender,
     income: req.body.income,
     career: req.body.career,
     appeal: req.body.appeal
  })
  res.redirect("/maid_register");
})

module.exports = router;
