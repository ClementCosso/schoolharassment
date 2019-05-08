// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
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

let users = require("./seed_user");

let etablissements = require("./seed_etablissement");

User.deleteMany()
  .then(() => {
    return Etablissement.deleteMany();
  })
  .then(x => {
    return Etablissement.create(etablissements);
  })
  .then(etablissements => {
    users.forEach(user => {
      user.etablissement = etablissements[user.etablissement]._id;
    });
    return User.create(users);
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
