const bcrypt = require("bcrypt");

const bcryptSalt = 10;

module.exports = [
  {
    nom: "Schmidt",
    prenom: "Lenora",
    classe: "minim",
    email: "lenoraschmidt@sultrax.com",
    gender: "female",
    etablissement: 2,
    parent: [1, 3],
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Ball",
    prenom: "Bernadette",
    classe: "et",
    email: "bernadetteball@sultrax.com",
    gender: "female",
    etablissement: 1,
    parent: [4, 3],
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Sutton",
    prenom: "Wiley",
    classe: "et",
    email: "wileysutton@sultrax.com",
    gender: "male",
    etablissement: 1,
    parent: [2, 3],
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Carlson",
    prenom: "Dean",
    classe: "tempor",
    email: "deancarlson@sultrax.com",
    gender: "male",
    etablissement: 2,
    parent: [3, 2],
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Contreras",
    prenom: "Rita",
    classe: "ex",
    email: "ritacontreras@sultrax.com",
    gender: "female",
    etablissement: 2,
    parent: [5, 3],
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  }
];
