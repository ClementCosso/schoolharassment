// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Etablissement = require("../models/Etablissement");

const bcryptSalt = 10;

const dbtitle = 'schoolharassment';
mongoose.connect(`mongodb://localhost/${dbtitle}`);
User.collection.drop();
Etablissement.collection.drop();

const users = [
  {
    nom: "Maggie",
    prenom: "Ray",
    classe: "6 eme 1",
    username: "maggieray@waterbaby.com",
    telephone: "+33 (964) 423-3341",
    role: "ELEVE",
    genre: "female",
    etablissement: {
      username: "College Montaigne",
      adresse: "nostrud aute magna",
      ville: "qui",
      cp: "33000",
      departement: "Gironde",
      email: "wintersstrong@conjurica.com",
      telephone: "+33 (963) 477-2795"
    },
    parent_nom: "Maggie",
    parent_prenom: "James",
    parent_email: "maggie.james@gmail.com",
    parent_telephone: "+33 (964) 423-3345",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Ray",
    prenom: "Sophie",
    classe: "6 eme 1",
    username: "joel@ray.com",
    telephone: "+33 (964) 423-3341",
    role: "ELEVE",
    genre: "female",
    etablissement: {
      username: "College Montaigne",
      adresse: "nostrud aute magna",
      ville: "qui",
      cp: "33000",
      departement: "Gironde",
      email: "wintersstrong@conjurica.com",
      telephone: "+33 (963) 477-2795"
    },
    parent_nom: "Ray",
    parent_prenom: "James",
    parent_email: "ray.james@gmail.com",
    parent_telephone: "+33 (964) 423-3345",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Jill",
    prenom: "Max",
    classe: "6 eme 1",
    username: "jill@max.com",
    telephone: "+33 (964) 423-3341",
    role: "ELEVE",
    genre: "male",
    etablissement: {
      username: "College Montaigne",
      adresse: "nostrud aute magna",
      ville: "qui",
      cp: "33000",
      departement: "Gironde",
      email: "wintersstrong@conjurica.com",
      telephone: "+33 (963) 477-2795"
    },
    parent_nom: "Jill",
    parent_prenom: "James",
    parent_email: "jill.james@gmail.com",
    parent_telephone: "+33 (964) 423-3345",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Nath",
    prenom: "Bill",
    classe: "6 eme 1",
    username: "nath@bill.com",
    telephone: "+33 (964) 423-3341",
    role: "ELEVE",
    genre: "female",
    etablissement: {
      username: "College Montaigne",
      adresse: "nostrud aute magna",
      ville: "qui",
      cp: "33000",
      departement: "Gironde",
      email: "wintersstrong@conjurica.com",
      telephone: "+33 (963) 477-2795"
    },
    parent_nom: "Nath",
    parent_prenom: "James",
    parent_email: "jill.james@gmail.com",
    parent_telephone: "+33 (964) 423-3345",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Dane",
    prenom: "Nill",
    classe: "6 eme 1",
    username: "dann@nill.com",
    telephone: "+33 (964) 423-3341",
    role: "ELEVE",
    genre: "male",
    etablissement: {
      username: "College Montaigne",
      adresse: "nostrud aute magna",
      ville: "qui",
      cp: "33000",
      departement: "Gironde",
      email: "wintersstrong@conjurica.com",
      telephone: "+33 (963) 477-2795"
    },
    parent_nom: "Dane",
    parent_prenom: "James",
    parent_email: "dane.ada@gmail.com",
    parent_telephone: "+33 (964) 423-3345",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "John",
    prenom: "Bell",
    classe: "",
    username: "john@bell.com",
    telephone: "+33 (964) 423-3341",
    role: "PRINCIPAL.E",
    genre: "male",
    etablissement: {
      username: "College Montaigne",
      adresse: "nostrud aute magna",
      ville: "qui",
      cp: "33000",
      departement: "Gironde",
      email: "wintersstrong@conjurica.com",
      telephone: "+33 (963) 477-2795"
    },
    parent_nom: "",
    parent_prenom: "",
    parent_email: "",
    parent_telephone: "",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Samantha",
    prenom: "Jordan",
    classe: "",
    username: "samantha@jordan.com",
    telephone: "+33 (964) 423-3341",
    role: "PROFESSEUR.E",
    genre: "female",
    etablissement: {
      username: "College Montaigne",
      adresse: "nostrud aute magna",
      ville: "qui",
      cp: "33000",
      departement: "Gironde",
      email: "wintersstrong@conjurica.com",
      telephone: "+33 (963) 477-2795"
    },
    parent_nom: "",
    parent_prenom: "",
    parent_email: "",
    parent_telephone: "",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Jackson",
    prenom: "Smith",
    classe: "",
    username: "jasckson@smith.com",
    telephone: "+33 (964) 423-3341",
    role: "INFIRMIER.E",
    genre: "male",
    etablissement: {
      username: "College Montaigne",
      adresse: "nostrud aute magna",
      ville: "qui",
      cp: "33000",
      departement: "Gironde",
      email: "wintersstrong@conjurica.com",
      telephone: "+33 (963) 477-2795"
    },
    parent_nom: "",
    parent_prenom: "",
    parent_email: "",
    parent_telephone: "",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Diana",
    prenom: "Lynn",
    classe: "",
    username: "diana@lynn.com",
    telephone: "+33 (964) 423-3341",
    role: "CPE",
    genre: "male",
    etablissement: {
      username: "College Montaigne",
      adresse: "nostrud aute magna",
      ville: "qui",
      cp: "33000",
      departement: "Gironde",
      email: "wintersstrong@conjurica.com",
      telephone: "+33 (963) 477-2795"
    },
    parent_nom: "",
    parent_prenom: "",
    parent_email: "",
    parent_telephone: "",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Ron",
    prenom: "Hall",
    classe: "",
    username: "ron@hall.com",
    telephone: "+33 (964) 423-3341",
    role: "ASSISTANT.E D'EDUCATION",
    genre: "male",
    etablissement: {
      username: "College Montaigne",
      adresse: "nostrud aute magna",
      ville: "qui",
      cp: "33000",
      departement: "Gironde",
      email: "wintersstrong@conjurica.com",
      telephone: "+33 (963) 477-2795"
    },
    parent_nom: "",
    parent_prenom: "",
    parent_email: "",
    parent_telephone: "",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  }
]

const createEtablissements = users.map(user => {
  const newEtablissement = new Etablissement(user.etablissement)
  return newEtablissement.save()
  .then(etablissement => {
    return etablissement.nom;
  })
  .catch(error => {
    throw new Error(`Impossible to add the etablissement. ${error}`)
  })
})

let findEtablissements = Promise.all(createEtablissements)
  .then(etablissements => {
    return users.map(user => {
       return Etablissement.findOne({nom: user.etablissement.nom})
        .then(etablissement => {
          if (!etablissement) {
            throw new Error(`unknown etablissement ${user.etablissement.nom}`);
          }
          return Object.assign({}, user, {etablissement: etablissement._id});
        })
    });
})
.catch(error => {
  throw new Error(error)
})

const saveUsers = findEtablissements.then(findEtablissements => {
  return Promise.all(findEtablissements)
  .then(users => {
    return users.map(user => {
        const newUser = new User(user);
        return newUser.save();
    })
  })
}).then(saveUsers => {
  Promise.all(saveUsers)
  .then(users => users.forEach(user => console.log(`created ${user.title}`)))
  .then(() => mongoose.connection.close())
  .catch(err => console.log("Error while saving the user: ",err))
})
