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
*   IV  - ROUTES ELEVE      (définition des routes et methods)
*         
*         1/ INDEX
*
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
*               b) METHOD GET PAGE NOUVEAU MESSAGE
*               c) METHOD POST NOUVEAU MESSAGE
*               d) METHOD POST MESSAGE LU
*               e) METHOD POST SUPPRESSION MESSAGE
*               f) METHOD GET REPONSE MESSAGE
*               g) METHOD POST REPONSE MESSAGE
*               h) METHOD GET DETAIL MESSAGE
*               i) METHOD POST ARCHIVE MESSAGE
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
const checkEleve 		  = checkRoles("ELEVE");


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
/* -------------------------------------------- IV - R O U T E S   E L E V E ----------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------------- */


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                      1/ I N D E X                                                        //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// a) METHOD GET PAGE INDEX

router.get("/eleve/index_eleve", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render("eleve/index_eleve", {layout: 'layout_eleve.hbs', user: req.user});
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                    2/ P R O F I L E                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// a) METHOD GET PAGE PROFILE

router.get('/eleve/:id/profile_eleve', checkEleve, ensureLogin.ensureLoggedIn(), (req, res, next) => {
  User.findOne({_id: req.params.id}) 
  .then(user => {
    Etablissement.find({_id : {$eq: user.etablissement}})
    .then(etablissements => {
      res.render('eleve/profile_eleve', {layout: 'layout_eleve.hbs', user: user, etablissements:etablissements});
    })
  })
});

// b) METHOD GET PAGE UPDATE PROFILE

router.get('/eleve/:id/edit', checkEleve, ensureLogin.ensureLoggedIn(), (req, res, next) => {
  User.findOne({_id: req.params.id}) 
  .then(user => {
      res.render('eleve/edit', {layout: 'layout_eleve.hbs', user: user});
    })
    .catch((error) => {
      console.log(error);
    })
});

// c) METHOD POST UPDATE PROFILE

router.post('/eleve/edit', checkEleve, ensureLogin.ensureLoggedIn(), (req, res, next) => {

  const { telephone, username, password } = req.body;

  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  User.update({_id: req.query.user_id}, {$set: {telephone, username, password:hashPass}})
  .then((user) => {
    res.redirect('/eleve/'+req.query.user_id+'/profile_eleve');
  })
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                3/ M E S S A G E R I E                                                    //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// a) METHOD GET PAGE MESSAGERIE
router.get(
  "/eleve/:id/messagerie_eleve",
  checkEleve,
  ensureLogin.ensureLoggedIn(),
  (req, res, next) => {
    User.findOne({ _id: req.params.id }).then(user => {
      Message.find({ $and : [ {emetteur: { $eq: user._id }}, {archive: { $eq: "NON" }} ] })
        .populate("recepteur", "nom prenom username")
        .then(message_emis => {
          Message.find({
            $and: [{ lu: { $eq: "OUI" } }, { recepteur: { $eq: user._id } }]
          })
            .populate("emetteur", "nom prenom username")
            .then(message_lu => {
              Message.find({
                $and: [{ lu: { $eq: "NON" } }, { recepteur: { $eq: user._id } }]
              })
                .populate("emetteur", "nom prenom username")
                .then(message_non_lu => {
                  res.render("eleve/messagerie_eleve", {
                    layout: "layout_eleve.hbs",
                    user: user,
                    message_emis: message_emis,
                    message_lu: message_lu,
                    message_non_lu: message_non_lu
                  });
                });
            });
        });
    });
  }
);

// b) METHOD GET PAGE NOUVEAU MESSAGE

router.get("/eleve/:id/creation_message", checkEleve, ensureLogin.ensureLoggedIn(), (req, res, next) => {
  User.find({role: {$ne: 'ELEVE'}})
    .then(users => {
      res.render('eleve/creation_message', {layout: 'layout_eleve.hbs', users: users, user: req.user});
    })
    .catch(error => {
      console.log('Error while getting the users from the DB: ', error);
    })
});

// c) METHOD POST NOUVEAU MESSAGE

router.post('/eleve/creation_message', checkEleve, ensureLogin.ensureLoggedIn(), (req, res, next) => {

  const emetteur  = req.body.emetteur;
  const recepteur = req.body.recepteur;
  const sujet     = req.body.sujet;
  const contenu   = req.body.contenu;
  const statut    = req.body.statut;
  const lu        = req.body.lu;
  const objet     = req.body.objet;
  const archive     = req.body.archive;
  const signalement     = req.body.signalement;
  const priority_level     = req.body.priority_level;
  

  if (sujet === "" || contenu === "") {
    res.render("eleve/creation_message", { message: "Veuillez remplir tous les champs" });
    return;
  }

  Message.findOne({ contenu }, "contenu", (err, message) => {
    if (message !== null) {
      res.render("eleve/creation_message", { message: "The message already exists" });
      return;
    }

    const newMessage = new Message({
      emetteur,
      recepteur,
      sujet,
      contenu,
      statut,
      lu,
      objet,
      archive,
      signalement,
      priority_level
    });

    newMessage.save()
    .then(() => {
      res.redirect("/eleve/"+emetteur+"/messagerie_eleve");
    })
    .catch(err => {
      res.render("eleve/creation_message", { message: "Something went wrong" });
    })
  });

});

// d) METHOD POST MESSAGE LU

router.post('/eleve/:id/message_lu', checkEleve, ensureLogin.ensureLoggedIn(), (req, res, next) => {

  const lu = req.body.lu;

  Message.findOneAndUpdate( {_id: req.params.id}, {$set: {lu : 'OUI'} } )
  .then((user) => {
    res.redirect('back');
  })

});

// e) METHOD POST SUPPRESSION MESSAGE

router.post('/eleve/:id/delete_message', checkEleve, ensureLogin.ensureLoggedIn(), function(req, res){
  Message.findByIdAndRemove({_id: req.params.id}) 
  .then((message) => {
    res.redirect('back');
  })
  .catch((error) => {
    console.log(error);
  })
});

// f) METHOD GET REPONSE MESSAGE

router.get('/eleve/:id/reponse_message', checkEleve, ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const lu = req.body.lu;
  Message.findOneAndUpdate( {_id: req.params.id}, {$set: {lu : 'OUI'} } )
  .then((message) =>
    Message.findOne({_id: req.params.id}) 
    .then(reponse_message => {
      res.render('eleve/reponse_message', {layout: 'layout_eleve.hbs', reponse_message: reponse_message, message: message});
    })
  )
  .catch((error) => {
    console.log(error);
  })
});

// g) METHOD POST REPONSE MESSAGE

router.post('/eleve/reponse_message', checkEleve, ensureLogin.ensureLoggedIn(), (req, res, next) => {

  const emetteur  = req.body.emetteur;
  const recepteur = req.body.recepteur;
  const sujet     = req.body.sujet;
  const contenu   = req.body.contenu;
  const statut    = req.body.statut;
  const lu        = req.body.lu;
  const objet     = req.body.objet;
  const archive   = req.body.archive;
  const signalement   = req.body.signalement;
  const priority_level   = req.body.priority_level;
  

  if (sujet === "" || contenu === "") {
    res.render("eleve/reponse_message", { message: "Veuillez remplir tous les champs" });
    return;
  }

  Message.findOne({ contenu }, "contenu", (err, message) => {
    if (message !== null) {
      res.render("eleve/reponse_message", { message: "The message already exists" });
      return;
    }

    const newMessage = new Message({
      emetteur,
      recepteur,
      sujet,
      contenu,
      statut,
      lu,
      objet,
      archive,
      signalement,
      priority_level
    });

    newMessage.save()
    .then(() => {
      res.redirect("/eleve/"+emetteur+"/messagerie_eleve");
    })
    .catch(err => {
      res.render("eleve/reponse_message", { message: "Something went wrong" });
    })
  });

});

// h) METHOD GET DETAIL MESSAGE
router.get(
  "/eleve/:id/detail_message",
  checkEleve,
  ensureLogin.ensureLoggedIn(),
  (req, res, next) => {
        Message.findOne({ _id: req.params.id })
        .populate("recepteur", "nom prenom username")
        .then(reponse_message => {
          res.render("eleve/detail_message", {
            layout: "layout_eleve.hbs",
            reponse_message: reponse_message
          });
        })
      .catch(error => {
        console.log(error);
      });
  }
);

// i) METHOD POST ARCHIVE MESSAGE
router.post("/eleve/:id/archive_message", checkEleve, ensureLogin.ensureLoggedIn(), (req, res, next) => {

    const archive = req.body.archive;

    Message.findOneAndUpdate({ _id: req.params.id },{ $set: { archive: "OUI" } })
    .then(user => {
      res.redirect("back");
    });
  }
);


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


module.exports = router;