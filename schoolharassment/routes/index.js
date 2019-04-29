/* -------------------------------------------------------------------------------------- */
/* ------------------------------- C O N F I G U R A T I O N ---------------------------- */
/* -------------------------------------------------------------------------------------- */

const express = require('express');
const router  = express.Router();
const ensureLogin = require("connect-ensure-login");
const flash = require("connect-flash");
const Etablissement = require('../models/Etablissement');
const User = require("../models/User");

/* -------------------------------------------------------------------------------------- */
/* ----------------------------- P A G E   A C C U E I L -------------------------------- */
/* -------------------------------------------------------------------------------------- */

// METHOD GET PAGE ACCEUIL
/*
  Au chargement de l'application, si l'utilisateur n'est pas identifié on lui renvoit la page de connexion
*/
router.get('/', (req, res, next) => {
  if (req.isAuthenticated()) {
      res.render('index');
    } else {
      res.redirect('/auth/login');
    }
});

/* -------------------------------------------------------------------------------------- */
/* ------------------------ P A G E   M O D E   E M P L O I ----------------------------- */
/* -------------------------------------------------------------------------------------- */

// METHOD GET PAGE MODE EMPLOI
router.get("/mode_emploi", (req, res, next) => {
  res.render("mode_emploi");
});

/* -------------------------------------------------------------------------------------- */
/* ------------------------------- M E S S A G E R I E ---------------------------------- */
/* -------------------------------------------------------------------------------------- */

// METHOD GET PAGE MESSAGERIE
router.get("/messagerie", (req, res, next) => {
  res.render("messagerie");
});

/* -------------------------------------------------------------------------------------- */
/* ---------------------------------- P R O F I L E ------------------------------------- */
/* -------------------------------------------------------------------------------------- */

// // METHOD GET PAGE PROFILE
router.get('/profile', ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render('profile', {user: req.user});
});


module.exports = router;