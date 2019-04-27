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

let eleves = require("./seed_eleve");

let parents = require("./seed_parent");

let encadrants = require("./seed_encadrant");

let etablissements = require("./seed_etablissement");

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
    return Promise.all([
      Parent.create(parents),
      Etablissement.create(etablissements)
    ]);
  })
  .then(results => {
    let created_parents = results[0];
    let created_etablissements = results[1];
    eleves.forEach(elev => {
      console.log("oko", elev);
      elev.parent = elev.parent.map(p => created_parents[p - 1]._id);
      elev.etablissement = created_etablissements[elev.etablissement - 1]._id;
    });
    return Promise.all([Eleve.create(eleves), created_etablissements]);
  })

  .then(results => {
    let created_etablissements = results[1];
    encadrants.forEach(encadr => {
      encadr.etablissement =
        created_etablissements[encadr.etablissement - 1]._id;
    });
    return Encadrant.create(encadrants);
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
