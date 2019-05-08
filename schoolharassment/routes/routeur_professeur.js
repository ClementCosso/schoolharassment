/*
******************************************************************************************************************************
*                                                                       
*                                           T A B L E    D E S   M A T I E R E S
*
******************************************************************************************************************************
*
*
*   I   - CONFIGURATION     (settings, models, middlewares)
*
*   II  - PAGE ACCEUIL      (lancement de l'application)
*
*   III - PAGE MODE EMPLOI  (mode emploi de l'application - à definir)
*
*   IV  - ROUTES PROF       (définition des routes et methods)
*
*         1/ INDEX
.
*               a) METHOD GET PAGE INDEX
*
*         2/ PROFILE
*
*               a) METHOD GET PAGE PROFILE
*               b) METHOD GET PAGE UPDATE PROFILE
*               c) METHOD POST UPDATE PROFILE
*
*         3/ MESSAGERIE
*
*               a) METHOD GET PAGE MESSAGERIE
*
*
******************************************************************************************************************************
*/

/* ------------------------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------------- */
/* -------------------------------------------  I - C O N F I G U R A T I O N  --------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------------- */


const express   = require('express');
const router  = express.Router();
const ensureLogin = require("connect-ensure-login");
const flash = require("connect-flash");
var helpers = require('handlebars-helpers')();

// MODELS
const Etablissement = require('../models/Etablissement');
const User = require("../models/User");
const Message = require("../models/Message");

// Bcrypt to encrypt passwords
const bcrypt      = require("bcrypt");
const bcryptSalt  = 10;

// FONCTION ROLES
function checkRoles(role) {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.redirect('/login')
    }
  }
}

// DEFINITION DES ROLES
const checkProfesseur = checkRoles("PROFESSEUR.E");


/* ------------------------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------------- */
/* -------------------------------------------  II - P A G E   A C C U E I L  ---------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------------- */


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


/* ------------------------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------------- */
/* ---------------------------------------  III - P A G E   M O D E   E M P L O I  ----------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------------- */


// METHOD GET PAGE MODE EMPLOI
router.get("/mode_emploi", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render("mode_emploi", {layout:false});
});


/* ------------------------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------------- */
/* -------------------------------------------- IV - R O U T E S   P R O F ------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------------- */


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                      1/ I N D E X                                                        //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// a) METHOD GET PAGE INDEX

router.get("/professeur/index_professeur", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render("professeur/index_professeur", {layout: 'layout_professeur.hbs', user: req.user});
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                    2/ P R O F I L E                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// a) METHOD GET PAGE PROFILE

router.get('/professeur/:id/profile_professeur', checkProfesseur, ensureLogin.ensureLoggedIn(), (req, res, next) => {
  User.findOne({_id: req.params.id}) 
  .then(user => {
    Etablissement.find({_id : {$eq: user.etablissement}})
    .then(etablissements => {
      res.render('professeur/profile_professeur', {layout: 'layout_professeur.hbs', user: user, etablissements:etablissements});
    })
  })
});

// b) METHOD GET PAGE UPDATE PROFILE

router.get('/professeur/:id/edit', checkProfesseur, ensureLogin.ensureLoggedIn(), (req, res, next) => {
  User.findOne({_id: req.params.id}) 
  .then(user => {
      res.render('professeur/edit',{layout: 'layout_professeur.hbs', user: user});
    })
    .catch((error) => {
      console.log(error);
    })
});

// c) METHOD POST UPDATE PROFILE

router.post('/professeur/edit', checkProfesseur, ensureLogin.ensureLoggedIn(), (req, res, next) => {

  const { telephone, username, password } = req.body;

  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  User.update({_id: req.query.user_id}, {$set: {telephone, username, password:hashPass}})
  .then((user) => {
    res.redirect('/professeur/'+req.query.user_id+'/profile_professeur');
  })
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                3/ M E S S A G E R I E                                                    //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// a) METHOD GET PAGE MESSAGERIE

router.get("/professeur/messagerie_professeur", checkProfesseur, ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render("professeur/messagerie_professeur", {layout: 'layout_professeur.hbs', user: req.user});
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


module.exports = router;