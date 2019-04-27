const bcrypt = require("bcrypt");

const bcryptSalt = 10;

module.exports = [
  {
    nom: "Hill",
    prenom: "Payne",
    email: "paynehill@nimon.com",
    telephone: "+33 (827) 471-3126",
    role: "PROFESSEUR.E",
    etablissement: "aliquip do et",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Lawson",
    prenom: "Ayala",
    email: "ayalalawson@nimon.com",
    telephone: "+33 (881) 409-2933",
    role: "INFIRMIER.E",
    etablissement: "enim culpa irure",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Maxwell",
    prenom: "Pate",
    email: "patemaxwell@nimon.com",
    telephone: "+33 (911) 527-3411",
    role: "CPE",
    etablissement: "elit laboris enim",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Atkins",
    prenom: "Benita",
    email: "benitaatkins@nimon.com",
    telephone: "+33 (910) 532-3098",
    role: "ASSISTANT.E D'EDUCATION",
    etablissement: "ad laborum anim",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Oneal",
    prenom: "Sharon",
    email: "sharononeal@nimon.com",
    telephone: "+33 (963) 495-3359",
    role: "PRINCIPAL.E",
    etablissement: "excepteur mollit voluptate",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Howard",
    prenom: "Bonnie",
    email: "bonniehoward@nimon.com",
    telephone: "+33 (864) 558-2127",
    role: "PRINCIPAL.E",
    etablissement: "sit quis aute",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  }
];
