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
*   II  - PAGE ACCEUIL      (lancement de l'application)
*
*   III - PAGE MODE EMPLOI  (mode emploi de l'application - à definir)
*
*   IV  - ELEVE             (définition des routes pour ELEVE)
*
*   V   - PROF              (définition des routes pour PROF)
*
*   VI  - DIRECTEUR         (définition des routes pour DIRECTEUR)
*
*
*******************************************************************************************
*/

/* -------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------- */
/* ------------------------------- C O N F I G U R A T I O N ---------------------------- */
/* -------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------- */

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
const checkProfesseur = checkRoles("PROFESSEUR.E");
const checkCPE 			  = checkRoles("CPE");        
const checkPrincipal 	= checkRoles("PRINCIPAL.E");
const checkInfirmier 	= checkRoles("INFIRMIER.E");
const checkAssitant 	= checkRoles("ASSISTANT.E D'EDUCATION");

/* -------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------- */
/* ------------------------------ P A G E   A C C U E I L ------------------------------- */
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
/* ------------------------------------ E L E V E --------------------------------------- */
/* -------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------- */

// METHOD GET INDEX PAGE
router.get("/eleve/index_eleve", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render("eleve/index_eleve", {layout: 'layout_eleve.hbs', user: req.user});
});

// METHOD GET PAGE PROFILE
router.get('/eleve/:id/profile_eleve', checkEleve, ensureLogin.ensureLoggedIn(), (req, res, next) => {
  User.findOne({_id: req.params.id}) 
  .then(user => {
    Etablissement.find({_id : {$eq: user.etablissement}})
    .then(etablissements => {
      res.render('eleve/profile_eleve', {layout: 'layout_eleve.hbs', user: user, etablissements:etablissements});
    })
  })
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
    res.redirect('/eleve/'+req.query.user_id+'/profile_eleve');
  })
});


// METHOD GET PAGE MESSAGERIE
router.get("/eleve/:id/messagerie_eleve", checkEleve, ensureLogin.ensureLoggedIn(), (req, res, next) => {
  User.findOne({_id: req.params.id}) 
  .then(user => {
    Message.find({emetteur: { $eq: user._id }})
    .then(message_emis => {
      User.find()
      .then(users => {
        Message.find({$and: [ {lu: { $eq: 'OUI' }} , {recepteur: { $eq: user._id }} ] })
        .then(message_lu => {
          Message.find({$and: [ {lu: { $eq: 'NON' }} , {recepteur: { $eq: user._id }} ] })
          .then(message_non_lu => {
            res.render('eleve/messagerie_eleve', {layout: 'layout_eleve.hbs', user: user, message_emis: message_emis, users: users, message_lu: message_lu, message_non_lu: message_non_lu});
         })
        })
      })
    })
  })
});

// METHOD GET ENVOI MESSAGE
router.get("/eleve/:id/creation_message", checkEleve, ensureLogin.ensureLoggedIn(), (req, res, next) => {
  User.find({role: {$ne: 'ELEVE'}})
    .then(users => {
      res.render('eleve/creation_message', {layout: 'layout_eleve.hbs', users: users, user: req.user});
    })
    .catch(error => {
      console.log('Error while getting the users from the DB: ', error);
    })
});

// METHOD POST ENVOI MESSAGE
router.post('/eleve/creation_message', checkEleve, ensureLogin.ensureLoggedIn(), (req, res, next) => {

  const emetteur  = req.body.emetteur;
  const recepteur = req.body.recepteur;
  const sujet     = req.body.sujet;
  const contenu   = req.body.contenu;
  const statut    = req.body.statut;
  const lu        = req.body.lu;

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
      lu
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

// METHOD POST MESSAGE LU
router.post('/eleve/:id/message_lu', checkEleve, ensureLogin.ensureLoggedIn(), (req, res, next) => {

  const lu = req.body.lu;

  Message.findOneAndUpdate( {_id: req.params.id}, {$set: {lu : 'OUI'} } )
  .then((user) => {
    res.redirect('back');
  })

});


// METHOD SUPPRESSION MESSAGE
router.post('/eleve/:id/delete_message', checkEleve, ensureLogin.ensureLoggedIn(), function(req, res){
  Message.findByIdAndRemove({_id: req.params.id}) 
  .then((message) => {
    res.redirect('back');
  })
  .catch((error) => {
    console.log(error);
  })
});

// METHOD GET REPONSE MESSAGE
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

// METHOD POST REPONSE MESSAGE
router.post('/eleve/reponse_message', checkEleve, ensureLogin.ensureLoggedIn(), (req, res, next) => {

  const emetteur  = req.body.emetteur;
  const recepteur = req.body.recepteur;
  const sujet     = req.body.sujet;
  const contenu   = req.body.contenu;
  const statut    = req.body.statut;
  const lu        = req.body.lu;

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
      lu
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
router.get('/professeur/:id/profile_professeur', checkProfesseur, ensureLogin.ensureLoggedIn(), (req, res, next) => {
  User.findOne({_id: req.params.id}) 
  .then(user => {
    Etablissement.find({_id : {$eq: user.etablissement}})
    .then(etablissements => {
      res.render('professeur/profile_professeur', {layout: 'layout_professeur.hbs', user: user, etablissements:etablissements});
    })
  })
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
    res.redirect('/professeur/'+req.query.user_id+'/profile_professeur');
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
router.get('/principal/:id/profile_principal', checkPrincipal, ensureLogin.ensureLoggedIn(), (req, res, next) => {
  User.findOne({_id: req.params.id}) 
  .then(user => {
    Etablissement.find({_id : {$eq: user.etablissement}})
    .then(etablissements => {
      res.render('principal/profile_principal', {layout: 'layout_principal.hbs', user: user, etablissements:etablissements});
    })
  })
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
    res.redirect('/principal/'+req.query.user_id+'/profile_principal');
  })
});

// METHOD GET PAGE LISTE UTILISATEUR
router.get('/principal/liste_utilisateur', checkPrincipal, ensureLogin.ensureLoggedIn(), (req, res, next) => {
  User.find()
    .then(users => {
      res.render('principal/liste_utilisateur', {layout: 'layout_principal.hbs', users: users});
    })
    .catch(error => {
      console.log('Error while getting the users from the DB: ', error);
    })
});

// METHOD GET MODIFICATION D'UN UTILISATEUR
router.get('/principal/:id/update_user', (req, res, next) => {
  User.findOne({_id: req.params.id}) 
  .then(user => {
      res.render('principal/update_user', {layout: 'layout_principal.hbs', user: user});
    })
    .catch((error) => {
      console.log(error);
    })
});

// METHOD POST MODIFICATION D'UN UTILISATEUR
router.post('/principal/update_user', (req, res, next) => {
  const { nom, prenom, username, telephone, role, genre, classe, parent_nom, parent_prenom, parent_email, parent_telephone, password } = req.body;

  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  User.update({_id: req.query.user_id}, {$set: {nom, prenom, username, telephone, role, genre, classe, parent_nom, parent_prenom, parent_email, parent_telephone, password:hashPass}})
  .then((user) => {
    res.redirect('/principal/liste_utilisateur');
  })
});

// METHOD DELETE UTILISATEUR
router.post('/principal/:id/delete_user', function(req, res){
  User.findByIdAndRemove({_id: req.params.id}) 
  .then((user) => {
    res.redirect('/principal/liste_utilisateur');
  })
  .catch((error) => {
    console.log(error);
  })
});

// METHOD GET CREATION UTILISATEUR
router.get("/principal/signup", checkPrincipal, ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Etablissement.find()
  .then(etablissements => {
    res.render('principal/signup', {layout: 'layout_principal.hbs', etablissements});
  })
});

// METHOD POST CREATION UTILISATEUR
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

// METHOD GET PAGE LISTE ETABLISSEMENT
router.get('/principal/liste_etablissement', checkPrincipal, ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Etablissement.find()
    .then(etablissements => {
      res.render('principal/liste_etablissement', {layout: 'layout_principal.hbs', etablissements: etablissements});
    })
    .catch(error => {
      console.log('Error while getting the etablissements from the DB: ', error);
    })
});

// METHOD GET PAGE MODIFICATION D'UN ETABLISSEMENT
router.get('/principal/:id/update_etablissement', (req, res, next) => {
  Etablissement.findOne({_id: req.params.id}) 
  .then(etablissement => {
      res.render('principal/update_etablissement', {layout: 'layout_principal.hbs', etablissement: etablissement});
    })
    .catch((error) => {
      console.log(error);
    })
});

// METHOD POST PAGE MODIFICATION D'UN ETABLISSEMENT
router.post('/principal/:id/update_etablissement', (req, res, next) => {
  Etablissement.updateOne({_id: req.params.id}, {$set: req.body})
  .then(etablissement => {
    res.redirect('/principal/liste_etablissement');
  })
});

// METHOD DELETE ETABLISSEMENT
router.post('/principal/:id/delete', function(req, res){
  Etablissement.findByIdAndRemove({_id: req.params.id}) 
  .then((etablissement) => {
    res.redirect('/principal/liste_etablissement');
  })
  .catch((error) => {
    console.log(error);
  })
});

// METHOD GET PAGE CREATION ETABLISSEMENT
router.get("/principal/creation_etablissement", checkPrincipal, ensureLogin.ensureLoggedIn(), (req, res, next) => {
    res.render('principal/creation_etablissement', {layout: 'layout_principal.hbs'});
});

// METHOD POST PAGE CREATION ETABLISSEMENT
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

// MESSAGERIE

// METHOD GET PAGE MESSAGERIE
router.get("/principal/:id/messagerie_principal", checkPrincipal, ensureLogin.ensureLoggedIn(), (req, res, next) => {
  User.findOne({_id: req.params.id}) 
  .then(user => {
    Message.find({emetteur: { $eq: user._id }})
    .then(message_emis => {
      User.find()
      .then(users => {
        Message.find({$and: [ {lu: { $eq: 'OUI' }} , {recepteur: { $eq: user._id }} ] })
        .then(message_lu => {
          Message.find({$and: [ {lu: { $eq: 'NON' }} , {recepteur: { $eq: user._id }} ] })
          .then(message_non_lu => {
            res.render('principal/messagerie_principal', {layout: 'layout_principal.hbs', user: user, message_emis: message_emis, users: users, message_lu: message_lu, message_non_lu: message_non_lu});
         })
        })
      })
    })
  })
});

// METHOD GET ENVOI MESSAGE
router.get("/principal/:id/creation_message", checkPrincipal, ensureLogin.ensureLoggedIn(), (req, res, next) => {
  User.find()
    .then(users => {
      res.render('principal/creation_message', {layout: 'layout_principal.hbs', users: users, user: req.user});
    })
    .catch(error => {
      console.log('Error while getting the users from the DB: ', error);
    })
});

// METHOD POST ENVOI MESSAGE
router.post('/principal/creation_message', checkPrincipal, ensureLogin.ensureLoggedIn(), (req, res, next) => {

  const emetteur  = req.body.emetteur;
  const recepteur = req.body.recepteur;
  const sujet     = req.body.sujet;
  const contenu   = req.body.contenu;
  const statut    = req.body.statut;
  const lu        = req.body.lu;

  if (sujet === "" || contenu === "") {
    res.render("principal/creation_message", { message: "Veuillez remplir tous les champs" });
    return;
  }

  Message.findOne({ contenu }, "contenu", (err, message) => {
    if (message !== null) {
      res.render("principal/creation_message", { message: "The message already exists" });
      return;
    }

    const newMessage = new Message({
      emetteur,
      recepteur,
      sujet,
      contenu,
      statut,
      lu
    });

    newMessage.save()
    .then(() => {
      res.redirect("/principal/"+emetteur+"/messagerie_principal");
    })
    .catch(err => {
      res.render("principal/creation_message", { message: "Something went wrong" });
    })
  });

});

// METHOD POST MESSAGE LU
router.post('/principal/:id/message_lu', checkPrincipal, ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const lu = req.body.lu;
  Message.findOneAndUpdate( {_id: req.params.id}, {$set: {lu : 'OUI'} } )
  .then((user) => {
    res.redirect('back');
  })

});

// METHOD SUPPRESSION MESSAGE
router.post('/principal/:id/delete_message', checkPrincipal, ensureLogin.ensureLoggedIn(), function(req, res){
  Message.findByIdAndRemove({_id: req.params.id}) 
  .then((message) => {
    res.redirect('back');
  })
  .catch((error) => {
    console.log(error);
  })
});

// METHOD GET REPONSE MESSAGE
router.get('/principal/:id/reponse_message', checkPrincipal, ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const lu = req.body.lu;
  Message.findOneAndUpdate( {_id: req.params.id}, {$set: {lu : 'OUI'} } )
  .then((message) =>
    Message.findOne({_id: req.params.id}) 
    .then(reponse_message => {
      res.render('principal/reponse_message', {layout: 'layout_principal.hbs', reponse_message: reponse_message, message: message});
    })
  )
  .catch((error) => {
    console.log(error);
  })
});

// METHOD POST REPONSE MESSAGE
router.post('/principal/reponse_message', checkPrincipal, ensureLogin.ensureLoggedIn(), (req, res, next) => {

  const emetteur  = req.body.emetteur;
  const recepteur = req.body.recepteur;
  const sujet     = req.body.sujet;
  const contenu   = req.body.contenu;
  const statut    = req.body.statut;
  const lu        = req.body.lu;

  if (sujet === "" || contenu === "") {
    res.render("principal/reponse_message", { message: "Veuillez remplir tous les champs" });
    return;
  }

  Message.findOne({ contenu }, "contenu", (err, message) => {
    if (message !== null) {
      res.render("principal/reponse_message", { message: "The message already exists" });
      return;
    }

    const newMessage = new Message({
      emetteur,
      recepteur,
      sujet,
      contenu,
      statut,
      lu
    });

    newMessage.save()
    .then(() => {
      res.redirect("/principal/"+emetteur+"/messagerie_principal");
    })
    .catch(err => {
      res.render("principal/reponse_message", { message: "Something went wrong" });
    })
  });

});

module.exports = router;