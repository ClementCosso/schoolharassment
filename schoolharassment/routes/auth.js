/*
 *******************************************************************************************
 *
 *                         T A B L E    D E S   M A T I E R E S
 *
 *******************************************************************************************
 *
 *
 *   I   - CONFIGURATION     (settings, models, middlewares)
 *
 *   II  - LOGIN             (accès à l'application)
 *
 *   III - LOGOUT            (déconnexion à l'application)
 *
 *
 *******************************************************************************************
 */
/* -------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------- */
/* ------------------------------- C O N F I G U R A T I O N ---------------------------- */
/* -------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------- */

const express = require("express");
const passport = require("passport");
const router = express.Router();
const ensureLogin = require("connect-ensure-login");
const flash = require("connect-flash");
const User = require("../models/User");
const Etablissement = require("../models/Etablissement");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

/* -------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------- */
/* ------------------------------------- L O G I N -------------------------------------- */
/* -------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------- */

// METHOD GET PAGE LOGIN
router.get("/login", (req, res, next) => {
  res.render("auth/login", { message: req.flash("error"), layout: false });
});

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/auth/login" }),
  function(req, res) {
    if (req.user.role == "ELEVE") {
      res.redirect("/eleve/index_eleve");
    } else if (req.user.role == "PROFESSEUR.E") {
      res.redirect("/professeur/index_professeur");
    } else if (req.user.role == "PRINCIPAL.E") {
      res.redirect("/principal/index_principal");
    }
  }
);

/* -------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------- */
/* --------------------------------------- L O G O U T ---------------------------------- */
/* -------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------- */

// METHOD GET LOGOUT
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
