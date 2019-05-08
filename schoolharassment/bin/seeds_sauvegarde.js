const mongoose = require("mongoose");

const User = require("../models/User");
const Etablissement = require("../models/Etablissement");

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const etablissements_seeds = [
  {
    nom: "College Montaigne",
    adresse: "nostrud aute magna",
    ville: "qui",
    cp: "33000",
    departement: "Gironde",
    telephone: "+33 (963) 477-2795"
  },
  {
    nom: "College Zola",
    adresse: "nostrud aute magna",
    ville: "Paris",
    cp: "75001",
    departement: "Paris",
    telephone: "+33 (963) 477-2795"
  },
  {
    nom: "College Simone de Beauvoir",
    adresse: "nostrud aute magna",
    ville: "Marseille",
    cp: "13001",
    departement: "Bouches-du-Rhône",
    telephone: "+33 (963) 477-2795"
  },
]

const users_seeds = [
  {
    nom: "Maggie",
    prenom: "Ray",
    classe: "6 eme 1",
    username: "maggieray@waterbaby.com",
    telephone: "+33 (964) 423-3341",
    role: "ELEVE",
    genre: "female",
    etablissement: 0,
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
    etablissement: 0,
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
    etablissement: 0,
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
    etablissement: 0,
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
    etablissement: 0,
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
    etablissement: 0,
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
    etablissement: 0,
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
    etablissement: 0,
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
    etablissement: 0,
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
    etablissement: 0,
    parent_nom: "",
    parent_prenom: "",
    parent_email: "",
    parent_telephone: "",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  }
]

mongoose
  .connect("mongodb://localhost/schoolharassment", { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

let users = require("./seed_user");

let etablissements = require("./seed_etablissement");

User.deleteMany()
  .then(() => {
    return Etablissement.deleteMany();
  })
  .then(x => {
    return Etablissement.create(etablissements_seeds);
  })
  .then(etablissements => {
    users_seeds.forEach(user => {
      user.etablissement = etablissements[user.etablissement]._id;
    });
    return User.create(users_seeds);
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });