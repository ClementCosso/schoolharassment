const bcrypt = require("bcrypt");

const bcryptSalt = 10;

module.exports = [
  {
    nom: "Schmidt",
    prenom: "Lenora",
    classe: "minim",
    email: "lenoraschmidt@sultrax.com",
    gender: "female",
    etablissement: "reprehenderit voluptate eu",
    parent: "Fannie Benson",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Ball",
    prenom: "Bernadette",
    classe: "et",
    email: "bernadetteball@sultrax.com",
    gender: "female",
    etablissement: "reprehenderit irure veniam",
    parent: "Fitzgerald Franks",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Sutton",
    prenom: "Wiley",
    classe: "et",
    email: "wileysutton@sultrax.com",
    gender: "male",
    etablissement: "consequat esse eu",
    parent: "Luna Barker",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Carlson",
    prenom: "Dean",
    classe: "tempor",
    email: "deancarlson@sultrax.com",
    gender: "male",
    etablissement: "ea adipisicing aliquip",
    parent: "Justine French",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Contreras",
    prenom: "Rita",
    classe: "ex",
    email: "ritacontreras@sultrax.com",
    gender: "female",
    etablissement: "consequat ad ullamco",
    parent: "Lawson Doyle",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  }
];
