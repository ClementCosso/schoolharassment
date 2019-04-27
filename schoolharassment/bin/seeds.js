// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Eleve = require("../models/Eleve");
const Parent = require("../models/Parent");
const Encadrant = require("../models/Encadrant");
const Etablissement = require("../models/Etablissement");

const bcryptSalt = 10;

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

let eleve = require("./seed_eleve");

let parent = require("./seed_parent");

let encadrant = require("./seed_encadrant");

let etablissement = require("./seed_etablissement");

Eleve.deleteMany()
  .then(() => {
    return Parent.deleteMany();
  })
  .then(() => {
    return Encadrant.deleteMany();
  })
  .then(() => {
    return Etablissement.deleteMany();
  })

  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
