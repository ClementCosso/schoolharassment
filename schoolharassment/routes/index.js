/* -------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------- */
/* ------------------------------- C O N F I G U R A T I O N ---------------------------- */
/* -------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------- */

const express = require('express');
const router  = express.Router();
const ensureLogin = require("connect-ensure-login");
const flash = require("connect-flash");

// MODELS
const Etablissement = require('../models/Etablissement');
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt      = require("bcrypt");
const bcryptSalt  = 10;

// ROLES
function checkRoles(role) {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.redirect('/login')
    }
  }
}

const checkEleve 		  = checkRoles("ELEVE");
const checkProfesseur = checkRoles("PROFESSEUR.E");
const checkCPE 			  = checkRoles("CPE");        
const checkPrincipal 	= checkRoles("PRINCIPAL.E");
const checkInfirmier 	= checkRoles("INFIRMIER.E");
const checkAssitant 	= checkRoles("ASSISTANT.E D'EDUCATION");

/* -------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------- */
/* ----------------------------- P A G E   A C C U E I L -------------------------------- */
/* -------------------------------------------------------------------------------------- */
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
/* -------------------------------------------------------------------------------------- */
/* ------------------------ P A G E   M O D E   E M P L O I ----------------------------- */
/* -------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------- */

// METHOD GET PAGE MODE EMPLOI
router.get("/mode_emploi", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render("mode_emploi", {layout:false});
});

/* -------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------- */
/* ------------------------------- M E S S A G E R I E ---------------------------------- */
/* -------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------- */

// METHOD GET PAGE MESSAGERIE
router.get("/messagerie", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render("messagerie");
});

/* -------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------- */
/* ------------------------------------ E L E V E --------------------------------------- */
/* -------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------- */

// METHOD GET INDEX PAGE
router.get("/eleve/index_eleve", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render("eleve/index_eleve", {layout: 'layout_eleve.hbs', user: req.user});
});

// METHOD GET PAGE PROFILE
router.get('/eleve/profile_eleve', checkEleve, ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render('eleve/profile_eleve', {layout: 'layout_eleve.hbs', user: req.user});
});

// METHOD GET EDIT PROFILE
router.get('/eleve/:id/edit', checkEleve, ensureLogin.ensureLoggedIn(), (req, res, next) => {
	User.findOne({_id: req.params.id}) 
	.then(user => {
      res.render('eleve/edit', {layout: 'layout_eleve.hbs', user: user});
    })
  	.catch((error) => {
    	console.log(error);
  	})
});

// METHOD POST EDIT PROFILE
router.post('/eleve/edit', checkEleve, ensureLogin.ensureLoggedIn(), (req, res, next) => {

	const { telephone, username, password } = req.body;

	const salt = bcrypt.genSaltSync(bcryptSalt);
	const hashPass = bcrypt.hashSync(password, salt);

  User.update({_id: req.query.user_id}, {$set: {telephone, username, password:hashPass}})
  .then((user) => {
    res.redirect('/eleve/profile_eleve');
  })
});

// METHOD GET PAGE MESSAGERIE
router.get("/eleve/messagerie_eleve", checkEleve, ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render("eleve/messagerie_eleve", {layout: 'layout_eleve.hbs', user: req.user});
});

/* -------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------- */
/* ------------------------------------ P R O F ----------------------------------------- */
/* -------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------- */

// METHOD GET INDEX PAGE
router.get("/professeur/index_professeur", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render("professeur/index_professeur", {layout: 'layout_professeur.hbs', user: req.user});
});

// METHOD GET PAGE PROFILE
router.get('/professeur/profile_professeur', checkProfesseur, ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render('professeur/profile_professeur', {layout: 'layout_professeur.hbs', user: req.user});
});

// METHOD GET EDIT PROFILE
router.get('/professeur/:id/edit', checkProfesseur, ensureLogin.ensureLoggedIn(), (req, res, next) => {
  User.findOne({_id: req.params.id}) 
  .then(user => {
      res.render('professeur/edit',{layout: 'layout_professeur.hbs', user: user});
    })
    .catch((error) => {
      console.log(error);
    })
});

// METHOD POST EDIT PROFILE
router.post('/professeur/edit', checkProfesseur, ensureLogin.ensureLoggedIn(), (req, res, next) => {

  const { telephone, username, password } = req.body;

  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  User.update({_id: req.query.user_id}, {$set: {telephone, username, password:hashPass}})
  .then((user) => {
    res.redirect('/professeur/profile_professeur');
  })
});

// METHOD GET PAGE MESSAGERIE
router.get("/professeur/messagerie_professeur", checkProfesseur, ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render("professeur/messagerie_professeur", {layout: 'layout_professeur.hbs', user: req.user});
});

/* -------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------- */
/* ------------------------------- D I R E C T E U R ------------------------------------ */
/* -------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------- */

// METHOD GET INDEX PAGE
router.get("/principal/index_principal", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render("principal/index_principal", {layout: 'layout_principal.hbs', user: req.user});
});

// METHOD GET PAGE PROFILE
router.get('/principal/profile_principal', checkPrincipal, ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render('principal/profile_principal', {layout: 'layout_principal.hbs', user: req.user});
});

// METHOD GET EDIT PROFILE
router.get('/principal/:id/edit', checkPrincipal, ensureLogin.ensureLoggedIn(), (req, res, next) => {
  User.findOne({_id: req.params.id}) 
  .then(user => {
      res.render('principal/edit',{layout: 'layout_principal.hbs', user: user});
    })
    .catch((error) => {
      console.log(error);
    })
});

// METHOD POST EDIT PROFILE
router.post('/principal/edit', checkPrincipal, ensureLogin.ensureLoggedIn(), (req, res, next) => {

  const { telephone, username, password } = req.body;

  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  User.update({_id: req.query.user_id}, {$set: {telephone, username, password:hashPass}})
  .then((user) => {
    res.redirect('/principal/profile_principal');
  })
});

// METHOD GET PAGE MESSAGERIE
router.get("/principal/messagerie_principal", checkPrincipal, ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render("principal/messagerie_principal", {layout: 'layout_principal.hbs', user: req.user});
});

// METHOD GET PAGE EDITION UTILISATEUR
router.get("/principal/signup", checkPrincipal, ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Etablissement.find()
  .then(etablissements => {
    res.render('principal/signup', {layout: 'layout_principal.hbs', etablissements});
  })
});


// METHOD POST PAGE SIGNUP
router.post("/principal/signup", checkPrincipal, ensureLogin.ensureLoggedIn(), (req, res, next) => {

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
    res.render("principal/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("principal/signup", { message: "The username already exists" });
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
      res.redirect("/principal/index_principal");
    })
    .catch(err => {
      res.render("principal/signup", { message: "Something went wrong" });
    })
  });

  
});

// METHOD GET PAGE EDITION ETABLISSEMENT
router.get("/principal/creation_etablissement", checkPrincipal, ensureLogin.ensureLoggedIn(), (req, res, next) => {
    res.render('principal/creation_etablissement', {layout: 'layout_principal.hbs'});
});

// METHOD POST PAGE AJOUT ETABLISSEMENT
router.post('/principal/creation_etablissement', (req, res, next) => {

  const nom         = req.body.nom;
  const adresse     = req.body.adresse;
  const ville       = req.body.ville;
  const cp          = req.body.cp;
  const departement = req.body.departement;
  const telephone   = req.body.telephone;

  if (nom === "" || adresse === "") {
    res.render("principal/creation_etablissement", { message: "Veuillez remplir tous les champs" });
    return;
  }

  Etablissement.findOne({ nom }, "nom", (err, etablissement) => {
    if (etablissement !== null) {
      res.render("principal/creation_etablissement", { message: "The etablissement already exists" });
      return;
    }

    const newEtablissement = new Etablissement({
      nom,
      adresse,
      ville,
      cp,
      departement,
      telephone
    });

    newEtablissement.save()
    .then(() => {
      res.redirect("/principal/index_principal");
    })
    .catch(err => {
      res.render("principal/creation_etablissement", { message: "Something went wrong" });
    })
  });

});

module.exports = router;