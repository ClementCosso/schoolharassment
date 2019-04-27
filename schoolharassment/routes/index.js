const express = require('express');
const router  = express.Router();
const ensureLogin = require("connect-ensure-login");
const flash = require("connect-flash");

/* GET home page */

router.get('/', (req, res, next) => {
  if (req.isAuthenticated()) {
      res.render('index');
    } else {
      res.redirect('/auth/login');
    }
});

module.exports = router;