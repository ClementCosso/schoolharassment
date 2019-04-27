const bcrypt = require("bcrypt");

const bcryptSalt = 10;

module.exports = [
  {
    nom: "Leblanc",
    prenom: "Joseph",
    email: "josephleblanc@nimon.com",
    telephone: "+33 (839) 565-3810",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Sanders",
    prenom: "Gamble",
    email: "gamblesanders@nimon.com",
    telephone: "+33 (850) 552-2307",

    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Knapp",
    prenom: "Margarita",
    email: "margaritaknapp@nimon.com",
    telephone: "+33 (913) 524-3326",

    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Rasmussen",
    prenom: "Marcia",
    email: "marciarasmussen@nimon.com",
    telephone: "+33 (836) 404-3169",

    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Carey",
    prenom: "Melba",
    email: "melbacarey@nimon.com",
    telephone: "+33 (806) 439-3111",

    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Washington",
    prenom: "Ballard",
    email: "ballardwashington@nimon.com",
    telephone: "+33 (831) 481-2720",

    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Tran",
    prenom: "Katherine",
    email: "katherinetran@nimon.com",
    telephone: "+33 (896) 573-2673",

    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  }
];
