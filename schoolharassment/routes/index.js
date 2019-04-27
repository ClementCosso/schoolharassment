const express = require('express');
const router  = express.Router();
const ensureLogin = require("connect-ensure-login");
const flash = require("connect-flash");

/* GET home page */

// router.get('/', (req, res, next) => {
//   if (req.isAuthenticated()) {
//       res.render('index');
//     } else {
//       res.redirect('/auth/login');
//     }
// });

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/profile", (req, res, next) => {
  res.render("profile");
});

router.get("/mode_emploi", (req, res, next) => {
  res.render("mode_emploi");
});

router.get("/messagerie", (req, res, next) => {
  res.render("messagerie");
});

module.exports = router;