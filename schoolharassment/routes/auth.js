/* -------------------------------------------------------------------------------------- */
/* ------------------------------- C O N F I G U R A T I O N ---------------------------- */
/* -------------------------------------------------------------------------------------- */

const express       = require("express");
const passport      = require('passport');
const router        = express.Router();
const ensureLogin   = require("connect-ensure-login");
const flash         = require("connect-flash");
const User          = require("../models/User");
const Etablissement = require("../models/Etablissement");

// Bcrypt to encrypt passwords
const bcrypt      = require("bcrypt");
const bcryptSalt  = 10;

/* -------------------------------------------------------------------------------------- */
/* ------------------------------------- L O G I N -------------------------------------- */
/* -------------------------------------------------------------------------------------- */

// METHOD GET PAGE LOGIN
router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error"), layout:false });
});

// METHOD POST PAGE LOGIN
router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));

/* -------------------------------------------------------------------------------------- */
/* --------------------------------------- L O G O U T ---------------------------------- */
/* -------------------------------------------------------------------------------------- */

// METHOD GET LOGOUT
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

/* -------------------------------------------------------------------------------------- */
/* --------------------------------------- S I G N U P ---------------------------------- */
/* -------------------------------------------------------------------------------------- */

// METHOD GET PAGE SIGNUP
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

// METHOD POST PAGE SIGNUP
router.post("/signup", (req, res, next) => {

  const nom               = req.body.nom;
  const prenom            = req.body.prenom;
  const classe            = req.body.classe;
  const username          = req.body.username;
  const telephone         = req.body.telephone;
  const role              = req.body.role;
  const genre             = req.body.genre;
  const etablissement     = req.body.etablissement;
  const parent_nom        = req.body.parent_nom;
  const parent_prenom     = req.body.parent_prenom;
  const parent_email      = req.body.parent_email;
  const parent_telephone  = req.body.parent_telephone;
  const password          = req.body.password;


  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      nom,
      prenom,
      classe,
      username,
      telephone,
      role,
      genre,
      etablissement,
      parent_nom,
      parent_prenom,
      parent_email,
      parent_telephone,
      password: hashPass
    });

    newUser.save()
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      res.render("auth/signup", { message: "Something went wrong" });
    })
  });

  
});

/* -------------------------------------------------------------------------------------- */
/* ---------------------------- E T A B L I S S E M E N T ------------------------------- */
/* -------------------------------------------------------------------------------------- */

// METHOD GET PAGE AJOUT ETABLISSEMENT
router.get("/creation_etablissement", (req, res, next) => {
  res.render("auth/creation_etablissement");
});

// METHOD POST PAGE AJOUT ETABLISSEMENT
router.post('/creation_etablissement', (req, res, next) => {

  const username    = req.body.username;
  const adresse     = req.body.adresse;
  const ville       = req.body.ville;
  const cp          = req.body.cp;
  const departement = req.body.departement;
  const telephone   = req.body.telephone;

  if (username === "" || adresse === "") {
    res.render("auth/creation_etablissement", { message: "Veuillez remplir tous les champs" });
    return;
  }

  Etablissement.findOne({ username }, "username", (err, etablissement) => {
    if (etablissement !== null) {
      res.render("auth/creation_etablissement", { message: "The etablissement already exists" });
      return;
    }

    const newEtablissement = new Etablissement({
      username,
      adresse,
      ville,
      cp,
      departement,
      telephone
    });

    newEtablissement.save()
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      res.render("auth/creation_etablissement", { message: "Something went wrong" });
    })
  });

});

module.exports = router;