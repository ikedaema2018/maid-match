const express = require('express');
var session = require('express-session');


function ensure(res, req, next){
  if (req.isAuthenticated()) {
    return next();
  }
  else {
    res.redirect('/login')
  }
}

module.exports = ensure;