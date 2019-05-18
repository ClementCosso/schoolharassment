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
 *   IV  - ROUTES PRINCIPAL  (définition des routes et methods)
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
 *         3/ UTILISATEURS
 *
 *               a) METHOD GET PAGE LISTE UTILISATEUR
 *               b) METHOD GET PAGE UPDATE UTILISATEUR
 *               c) METHOD POST UPDATE UTILISATEUR
 *               d) METHOD POST DELETE UTILISATEUR
 *               e) METHOD GET PAGE CREATION UTILISATEUR
 *               f) METHOD POST CREATION UTILISATEUR
 *               g) METHOD POST SEARCH BAR USERS AXIOS
 *
 *         4/ ETABLISSEMENTS
 *
 *               a) METHOD GET PAGE LISTE ETABLISSEMENT
 *               b) METHOD GET PAGE UPDATE ETABLISSEMENT
 *               c) METHOD POST PAGE UPDATE ETABLISSEMENT
 *               d) METHOD POST DELETE ETABLISSEMENT
 *               e) METHOD GET PAGE CREATION ETABLISSEMENT
 *               f) METHOD POST CREATION ETABLISSEMENT
 *               g) METHOD POST SEARCH BAR ETABLISSEMENTS AXIOS
 *
 *         5/ MESSAGERIE
 *
 *               a) METHOD GET PAGE MESSAGERIE
 *               b) METHOD GET PAGE NOUVEAU MESSAGE
 *               c) METHOD POST NOUVEAU MESSAGE
 *               d) METHOD POST MESSAGE LU
 *               e) METHOD POST SUPPRESSION MESSAGE
 *               f) METHOD GET REPONSE MESSAGE
 *               g) METHOD POST REPONSE MESSAGE
 *               h) METHOD GET DETAIL MESSAGE
 *               i) METHOD ARCHIVE MESSAGE
 *
 *        6/ RAPPORTS
 *
 *               a) METHOD GET RAPPORT TYPE HARCELEMENT MOIS EN COURS
 *
 *
 ******************************************************************************************************************************
 */

/* ------------------------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------------- */
/* -------------------------------------------  I - C O N F I G U R A T I O N  --------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------------- */

const express = require("express");
const router = express.Router();
const ensureLogin = require("connect-ensure-login");
const flash = require("connect-flash");
var helpers = require("handlebars-helpers")();
var moment = require("moment");

// MODELS
const Etablissement = require("../models/Etablissement");
const User = require("../models/User");
const Message = require("../models/Message");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

// FONCTION ROLES
function checkRoles(role) {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.redirect("/login");
    }
  };
}

// DEFINITION DES ROLES
const checkPrincipal = checkRoles("PRINCIPAL.E");

/* ------------------------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------------- */
/* -------------------------------------------  II - P A G E   A C C U E I L  ---------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------------- */

// METHOD GET PAGE ACCEUIL
/*
  Au chargement de l'application, si l'utilisateur n'est pas identifié on lui renvoit la page de connexion
*/
router.get("/", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render("index");
  } else {
    res.redirect("/auth/login");
  }
});

/* ------------------------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------------- */
/* ---------------------------------------  III - P A G E   M O D E   E M P L O I  ----------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------------- */

// METHOD GET PAGE MODE EMPLOI
router.get("/mode_emploi", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render("mode_emploi", { layout: false });
});

/* ------------------------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------------- */
/* ---------------------------------------- IV - R O U T E S   P R I N C I P A L ------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------------- */

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                      1/ I N D E X                                                        //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// a) METHOD GET PAGE INDEX

router.get(
  "/principal/index_principal",
  ensureLogin.ensureLoggedIn(),
  (req, res, next) => {
    res.render("principal/index_principal", {
      layout: "layout_principal.hbs",
      user: req.user
    });
  }
);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                    2/ P R O F I L E                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// a) METHOD GET PAGE PROFILE
router.get(
  "/principal/:id/profile_principal",
  checkPrincipal,
  ensureLogin.ensureLoggedIn(),
  (req, res, next) => {
    User.findOne({ _id: req.params.id }).then(user => {
      Etablissement.find({ _id: { $eq: user.etablissement } }).then(
        etablissements => {
          res.render("principal/profile_principal", {
            layout: "layout_principal.hbs",
            user: user,
            etablissements: etablissements
          });
        }
      );
    });
  }
);

// b) METHOD GET PAGE UPDATE PROFILE
router.get(
  "/principal/:id/edit",
  checkPrincipal,
  ensureLogin.ensureLoggedIn(),
  (req, res, next) => {
    User.findOne({ _id: req.params.id })
      .then(user => {
        res.render("principal/edit", {
          layout: "layout_principal.hbs",
          user: user
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
);

// c) METHOD POST UPDATE PROFILE
router.post(
  "/principal/edit",
  checkPrincipal,
  ensureLogin.ensureLoggedIn(),
  (req, res, next) => {
    const { telephone, username, password } = req.body;

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    User.update(
      { _id: req.query.user_id },
      { $set: { telephone, username, password: hashPass } }
    ).then(user => {
      res.redirect("/principal/" + req.query.user_id + "/profile_principal");
    });
  }
);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             3/ U T I L I S A T E U R S                                                   //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// a) METHOD GET PAGE LISTE UTILISATEUR
router.get(
  "/principal/:id/liste_utilisateur",
  checkPrincipal,
  ensureLogin.ensureLoggedIn(),
  (req, res, next) => {
    User.findOne({ _id: req.params.id })
      .then(user => {
        User.find().then(users => {
          res.render("principal/liste_utilisateur", {
            layout: "layout_principal.hbs",
            users: users,
            user: user
          });
        });
      })
      .catch(error => {
        console.log("Error while getting the users from the DB: ", error);
      });
  }
);

module.exports = router;

// b) METHOD GET PAGE UPDATE UTILISATEUR
router.get("/principal/:id/update_user", (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then(user => {
      res.render("principal/update_user", {
        layout: "layout_principal.hbs",
        user: user
      });
    })
    .catch(error => {
      console.log(error);
    });
});

// c) METHOD POST UPDATE UTILISATEUR
router.post("/principal/update_user", (req, res, next) => {
  const {
    nom,
    prenom,
    username,
    telephone,
    role,
    genre,
    classe,
    parent_nom,
    parent_prenom,
    parent_email,
    parent_telephone,
    password
  } = req.body;

  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  User.update(
    { _id: req.query.user_id },
    {
      $set: {
        nom,
        prenom,
        username,
        telephone,
        role,
        genre,
        classe,
        parent_nom,
        parent_prenom,
        parent_email,
        parent_telephone,
        password: hashPass
      }
    }
  ).then(user => {
    res.redirect("/principal/liste_utilisateur");
  });
});

// d) METHOD POST DELETE UTILISATEUR
router.post("/principal/:id/delete_user", function(req, res) {
  User.findByIdAndDelete({ _id: req.params.id })
    .then(user => {
      res.redirect("back");
    })
    .catch(error => {
      console.log(error);
    });
});

// e) METHOD GET PAGE CREATION UTILISATEUR
router.get(
  "/principal/:id/signup",
  checkPrincipal,
  ensureLogin.ensureLoggedIn(),
  (req, res, next) => {
    User.findOne({ _id: req.params.id }).then(user => {
      Etablissement.find().then(etablissements => {
        res.render("principal/signup", {
          layout: "layout_principal.hbs",
          user: user,
          etablissements
        });
      });
    });
  }
);

// f) METHOD POST CREATION UTILISATEUR
router.post(
  "/principal/signup",
  checkPrincipal,
  ensureLogin.ensureLoggedIn(),
  (req, res, next) => {
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const classe = req.body.classe;
    const username = req.body.username;
    const telephone = req.body.telephone;
    const role = req.body.role;
    const genre = req.body.genre;
    const etablissement = req.body.etablissement;
    const parent_nom = req.body.parent_nom;
    const parent_prenom = req.body.parent_prenom;
    const parent_email = req.body.parent_email;
    const parent_telephone = req.body.parent_telephone;
    const password = req.body.password;

    if (username === "" || password === "") {
      res.render("principal/signup", {
        message: "Indicate username and password"
      });
      return;
    }

    User.findOne({ username }, "username", (err, user) => {
      if (user !== null) {
        res.render("principal/signup", {
          message: "The username already exists"
        });
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

      newUser
        .save()
        .then(() => {
          res.redirect("/principal/index_principal");
        })
        .catch(err => {
          res.render("principal/signup", { message: "Something went wrong" });
        });
    });
  }
);

// g) METHOD POST SEARCH BAR USERS AXIOS

router.post("/principal/:id/liste_utilisateur", (req, res, next) => {
  User.find({
    $or: [
      {
        nom: { $regex: "^(?i)" + req.body.search }
      },
      {
        prenom: { $regex: "^(?i)" + req.body.search }
      },
      {
        role: { $regex: "^(?i)" + req.body.search }
      },
      { username: { $regex: "^(?i)" + req.body.search } }
    ]
  }).then(users => {
    res.send({ liste: users });
    console.log(liste);
  });
});

// h) METHOD GET PAGE PROFILE UTILISATEUR

router.get("/principal/:id/profile_user", (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then(user => {
      res.render("principal/profile_user", {
        layout: "layout_principal.hbs",
        user: user
      });
    })
    .catch(error => {
      console.log(error);
    });
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                           4/ E T A B L I S S E M E N T S                                                 //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// a) METHOD GET PAGE LISTE ETABLISSEMENT
router.get(
  "/principal/:id/liste_etablissement",
  checkPrincipal,
  ensureLogin.ensureLoggedIn(),
  (req, res, next) => {
    User.findOne({ _id: req.params.id })
      .then(user => {
        Etablissement.find().then(etablissements => {
          res.render("principal/liste_etablissement", {
            layout: "layout_principal.hbs",
            etablissements: etablissements,
            user: user
          });
        });
      })
      .catch(error => {
        console.log(
          "Error while getting the etablissements from the DB: ",
          error
        );
      });
  }
);

// b) METHOD GET PAGE UPDATE ETABLISSEMENT
router.get("/principal/:id/update_etablissement", (req, res, next) => {
  Etablissement.findOne({ _id: req.params.id })
    .then(etablissement => {
      res.render("principal/update_etablissement", {
        layout: "layout_principal.hbs",
        etablissement: etablissement
      });
    })
    .catch(error => {
      console.log(error);
    });
});

// c) METHOD POST PAGE UPDATE ETABLISSEMENT
router.post("/principal/:id/update_etablissement", (req, res, next) => {
  Etablissement.updateOne({ _id: req.params.id }, { $set: req.body }).then(
    etablissement => {
      res.redirect("/principal/liste_etablissement");
    }
  );
});

// d) METHOD POST DELETE ETABLISSEMENT
router.post("/principal/:id/delete_etablissement", function(req, res) {
  Etablissement.findByIdAndDelete({ _id: req.params.id })
    .then(etablissement => {
      res.redirect("back");
    })
    .catch(error => {
      console.log(error);
    });
});

// e) METHOD GET PAGE CREATION ETABLISSEMENT
router.get(
  "/principal/:id/creation_etablissement",
  checkPrincipal,
  ensureLogin.ensureLoggedIn(),
  (req, res, next) => {
    User.findOne({ _id: req.params.id }).then(user => {
      res.render("principal/creation_etablissement", {
        layout: "layout_principal.hbs",
        user: user
      });
    });
  }
);

// f) METHOD POST CREATION ETABLISSEMENT
router.post("/principal/creation_etablissement", (req, res, next) => {
  const nom = req.body.nom;
  const adresse = req.body.adresse;
  const ville = req.body.ville;
  const cp = req.body.cp;
  const departement = req.body.departement;
  const telephone = req.body.telephone;

  if (nom === "" || adresse === "") {
    res.render("principal/creation_etablissement", {
      message: "Veuillez remplir tous les champs"
    });
    return;
  }

  Etablissement.findOne({ nom }, "nom", (err, etablissement) => {
    if (etablissement !== null) {
      res.render("principal/creation_etablissement", {
        message: "The etablissement already exists"
      });
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

    newEtablissement
      .save()
      .then(() => {
        res.redirect("/principal/index_principal");
      })
      .catch(err => {
        res.render("principal/creation_etablissement", {
          message: "Something went wrong"
        });
      });
  });
});

// g) METHOD POST SEARCH BAR ETABLISSEMENTS AXIOS

router.post("/principal/:id/liste_etablissement", (req, res, next) => {
  Etablissement.find({
    $or: [
      {
        nom: { $regex: "^.*(?i)" + req.body.search }
      },
      {
        adresse: { $regex: "^.*(?i)" + req.body.search }
      },
      {
        ville: { $regex: "^.*(?i)" + req.body.search }
      },
      {
        departement: { $regex: "^.*(?i)" + req.body.search }
      }
    ]
  }).then(etablissements => {
    res.send({ liste: etablissements });
    console.log(liste);
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                5/ M E S S A G E R I E                                                    //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// a) METHOD GET PAGE MESSAGERIE
router.get(
  "/principal/:id/messagerie_principal",
  checkPrincipal,
  ensureLogin.ensureLoggedIn(),
  (req, res, next) => {
    User.findOne({ _id: req.params.id }).then(user => {
      Message.find({
        $and: [
          { emetteur: { $eq: user._id } },
          { statut: { $eq: "PUBLIC" } },
          { archive: { $eq: "NON" } }
        ]
      })
        .populate("recepteur", "nom prenom username")
        .then(message_emis_public => {
          Message.find({
            $and: [
              { emetteur: { $eq: user._id } },
              { statut: { $eq: "ANON" } },
              { archive: { $eq: "NON" } }
            ]
          }).then(message_emis_anon => {
            Message.find({
              $and: [
                { lu: { $eq: "OUI" } },
                { recepteur: { $eq: user._id } },
                { statut: { $eq: "PUBLIC" } }
              ]
            })
              .populate("emetteur", "nom prenom username")
              .then(message_lu_public => {
                Message.find({
                  $and: [
                    { lu: { $eq: "OUI" } },
                    { recepteur: { $eq: user._id } },
                    { statut: { $eq: "ANON" } }
                  ]
                }).then(message_lu_anon => {
                  Message.find({
                    $and: [
                      { lu: { $eq: "NON" } },
                      { recepteur: { $eq: user._id } },
                      { statut: { $eq: "PUBLIC" } }
                    ]
                  })
                    .populate("emetteur", "nom prenom username")
                    .then(message_non_lu_public => {
                      Message.find({
                        $and: [
                          { lu: { $eq: "NON" } },
                          { recepteur: { $eq: user._id } },
                          { statut: { $eq: "ANON" } }
                        ]
                      }).then(message_non_lu_anon => {
                        res.render("principal/messagerie_principal", {
                          layout: "layout_principal.hbs",
                          user: user,
                          message_emis_public: message_emis_public,
                          message_emis_anon: message_emis_anon,
                          message_lu_public: message_lu_public,
                          message_lu_anon: message_lu_anon,
                          message_non_lu_public: message_non_lu_public,
                          message_non_lu_anon: message_non_lu_anon
                        });
                      });
                    });
                });
              });
          });
        });
    });
  }
);

// b) METHOD GET NOUVEAU MESSAGE
router.get(
  "/principal/:id/creation_message",
  checkPrincipal,
  ensureLogin.ensureLoggedIn(),
  (req, res, next) => {
    User.find()
      .then(users => {
        res.render("principal/creation_message", {
          layout: "layout_principal.hbs",
          users: users,
          user: req.user
        });
      })
      .catch(error => {
        console.log("Error while getting the users from the DB: ", error);
      });
  }
);

// c) METHOD POST NOUVEAU MESSAGE
router.post(
  "/principal/creation_message",
  checkPrincipal,
  ensureLogin.ensureLoggedIn(),
  (req, res, next) => {
    const emetteur = req.body.emetteur;
    const recepteur = req.body.recepteur;
    const sujet     = req.body.sujet;
    const contenu   = req.body.contenu;
    const statut    = req.body.statut;
    const lu        = req.body.lu;
    const objet     = req.body.objet;
    const archive   = req.body.archive;
    const signalement   = req.body.signalement;
    const priority_level = req.body.priority_level;


    if (sujet === "" || contenu === "") {
      res.render("principal/creation_message", {
        message: "Veuillez remplir tous les champs"
      });
      return;
    }

    Message.findOne({ contenu }, "contenu", (err, message) => {
      if (message !== null) {
        res.render("principal/creation_message", {
          message: "The message already exists"
        });
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

      newMessage
        .save()
        .then(() => {
          res.redirect("/principal/" + emetteur + "/messagerie_principal");
        })
        .catch(err => {
          res.render("principal/creation_message", {
            message: "Something went wrong"
          });
        });
    });
  }
);

// d) METHOD POST MESSAGE LU
router.post(
  "/principal/:id/message_lu",
  checkPrincipal,
  ensureLogin.ensureLoggedIn(),
  (req, res, next) => {
    const lu = req.body.lu;
    Message.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { lu: "OUI" } }
    ).then(user => {
      res.redirect("back");
    });
  }
);

// e) METHOD SUPPRESSION MESSAGE
router.post(
  "/principal/:id/delete_message",
  checkPrincipal,
  ensureLogin.ensureLoggedIn(),
  function(req, res) {
    Message.findByIdAndRemove({ _id: req.params.id })
      .then(message => {
        res.redirect("back");
      })
      .catch(error => {
        console.log(error);
      });
  }
);

// f) METHOD GET REPONSE MESSAGE
router.get(
  "/principal/:id/reponse_message",
  checkPrincipal,
  ensureLogin.ensureLoggedIn(),
  (req, res, next) => {
    const lu = req.body.lu;
    Message.findOneAndUpdate({ _id: req.params.id }, { $set: { lu: "OUI" } })
      .then(message =>
        Message.findOne({ _id: req.params.id }).then(reponse_message => {
          res.render("principal/reponse_message", {
            layout: "layout_principal.hbs",
            reponse_message: reponse_message,
            message: message
          });
        })
      )
      .catch(error => {
        console.log(error);
      });
  }
);

// g) METHOD POST REPONSE MESSAGE
router.post(
  "/principal/reponse_message",
  checkPrincipal,
  ensureLogin.ensureLoggedIn(),
  (req, res, next) => {
    const emetteur = req.body.emetteur;
    const recepteur = req.body.recepteur;
    const sujet = req.body.sujet;
    const contenu = req.body.contenu;
    const statut = req.body.statut;
    const lu = req.body.lu;
    const objet = req.body.objet;
    const archive = req.body.archive;
    const signalement = req.body.signalement;
    const priority_level = req.body.priority_level;
    

    if (sujet === "" || contenu === "") {
      res.render("principal/reponse_message", {
        message: "Veuillez remplir tous les champs"
      });
      return;
    }

    Message.findOne({ contenu }, "contenu", (err, message) => {
      if (message !== null) {
        res.render("principal/reponse_message", {
          message: "The message already exists"
        });
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

      newMessage
        .save()
        .then(() => {
          res.redirect("/principal/" + emetteur + "/messagerie_principal");
        })
        .catch(err => {
          res.render("principal/reponse_message", {
            message: "Something went wrong"
          });
        });
    });
  }
);


// h) METHOD GET DETAIL MESSAGE
router.get(
  "/principal/:id/detail_message",
  checkPrincipal,
  ensureLogin.ensureLoggedIn(),
  (req, res, next) => {
    Message.findOne({ _id: req.params.id })
      .populate("recepteur", "nom prenom username")
      .then(reponse_message => {
        Message.find({ $and: [
                          { _id: { $eq: req.params.id } },
                          { statut: { $eq: "PUBLIC" } }
                        ]})
        .then(public => {
        res.render("principal/detail_message", {
          layout: "layout_principal.hbs",
          reponse_message: reponse_message,
          public: public
        });
      });
      })
      .catch(error => {
        console.log(error);
      });
  }
);

// i) METHOD ARCHIVE MESSAGE
router.post(
  "/principal/:id/archive_message",
  checkPrincipal,
  ensureLogin.ensureLoggedIn(),
  (req, res, next) => {
    const archive = req.body.archive;

    Message.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { archive: "OUI" } }
    ).then(user => {
      res.redirect("back");
    });
  }
);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                    6/ R A P P O R T S                                                    //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// a) METHOD GET RAPPORT TYPE HARCELEMENT MOIS EN COURS

var date = new Date();
var res = date.toISOString();
var a = res.slice(0, 8);
var start = a + "01";
var end = a + "31";
var debut_annee = res.slice(0, 4) + "-01-01";
var fin_annee = res.slice(0, 4) + "-12-31";

router.get(
  "/principal/rapport",
  checkPrincipal,
  ensureLogin.ensureLoggedIn(),
  (req, res, next) => {
    Message.find({ created_at: { $gte: start, $lt: end } })
      .count({
        $and: [
          { objet: { $eq: "HARCELEMENT PHYSIQUE" } },
          { signalement: { $eq: true } }
        ]
      })
      .then(category_hp_mois => {
        Message.find({ created_at: { $gte: debut_annee, $lt: fin_annee } })
          .count({
            $and: [
              { objet: { $eq: "HARCELEMENT PHYSIQUE" } },
              { signalement: { $eq: true } }
            ]
          })
          .then(category_hp_annee => {
            Message.find({ created_at: { $gte: start, $lt: end } })
              .count({
                $and: [
                  { objet: { $eq: "HARCELEMENT VERBAL" } },
                  { signalement: { $eq: true } }
                ]
              })
              .then(category_hv_mois => {
                Message.find({
                  created_at: { $gte: debut_annee, $lt: fin_annee }
                })
                  .count({
                    $and: [
                      { objet: { $eq: "HARCELEMENT VERBAL" } },
                      { signalement: { $eq: true } }
                    ]
                  })
                  .then(category_hv_annee => {
                    Message.find({ created_at: { $gte: start, $lt: end } })
                      .count({
                        $and: [
                          { objet: { $eq: "CYBERHARCELEMENT" } },
                          { signalement: { $eq: true } }
                        ]
                      })
                      .then(category_cy_mois => {
                        Message.find({
                          created_at: { $gte: debut_annee, $lt: fin_annee }
                        })
                          .count({
                            $and: [
                              { objet: { $eq: "CYBERHARCELEMENT" } },
                              { signalement: { $eq: true } }
                            ]
                          })
                          .then(category_cy_annee => {
                            Message.find({
                              created_at: { $gte: start, $lt: end }
                            })
                              .count({
                                $and: [
                                  { objet: { $eq: "HARCELEMENT SOCIAL" } },
                                  { signalement: { $eq: true } }
                                ]
                              })
                              .then(category_hso_mois => {
                                Message.find({
                                  created_at: {
                                    $gte: debut_annee,
                                    $lt: fin_annee
                                  }
                                })
                                  .count({
                                    $and: [
                                      { objet: { $eq: "HARCELEMENT SOCIAL" } },
                                      { signalement: { $eq: true } }
                                    ]
                                  })
                                  .then(category_hso_annee => {
                                    Message.find({
                                      created_at: { $gte: start, $lt: end }
                                    })
                                      .count({
                                        $and: [
                                          {
                                            objet: { $eq: "HARCELEMENT SEXUEL" }
                                          },
                                          { signalement: { $eq: true } }
                                        ]
                                      })
                                      .then(category_hse_mois => {
                                        Message.find({
                                          created_at: {
                                            $gte: debut_annee,
                                            $lt: fin_annee
                                          }
                                        })
                                          .count({
                                            $and: [
                                              {
                                                objet: {
                                                  $eq: "HARCELEMENT SEXUEL"
                                                }
                                              },
                                              { signalement: { $eq: true } }
                                            ]
                                          })
                                          .then(category_hse_annee => {
                                            Message.find({
                                              created_at: {
                                                $gte: start,
                                                $lt: end
                                              }
                                            })
                                              .count({
                                                $and: [
                                                  {
                                                    objet: {
                                                      $eq:
                                                        "AUTRE TYPE DE HARCELEMENT"
                                                    }
                                                  },
                                                  { signalement: { $eq: true } }
                                                ]
                                              })
                                              .then(category_ah_mois => {
                                                Message.find({
                                                  created_at: {
                                                    $gte: debut_annee,
                                                    $lt: fin_annee
                                                  }
                                                })
                                                  .count({
                                                    $and: [
                                                      {
                                                        objet: {
                                                          $eq:
                                                            "AUTRE TYPE DE HARCELEMENT"
                                                        }
                                                      },
                                                      {
                                                        signalement: {
                                                          $eq: true
                                                        }
                                                      }
                                                    ]
                                                  })
                                                  .then(category_ah_annee => {
                                                    res.render(
                                                      "principal/rapport",
                                                      {
                                                        layout:
                                                          "layout_principal.hbs",
                                                        category_hp_mois,
                                                        category_hv_mois,
                                                        category_cy_mois,
                                                        category_hso_mois,
                                                        category_hse_mois,
                                                        category_ah_mois,
                                                        category_hp_annee,
                                                        category_hv_annee,
                                                        category_cy_annee,
                                                        category_hso_annee,
                                                        category_hse_annee,
                                                        category_ah_annee
                                                      }
                                                    );
                                                  });
                                              });
                                          });
                                      });
                                  });
                              });
                          });
                      });
                  });
              });
          });
      })
      .catch(error => {
        console.log(error);
      });
  }
);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = router;
