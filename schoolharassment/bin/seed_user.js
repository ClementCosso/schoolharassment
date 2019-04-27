const bcrypt = require("bcrypt");

const bcryptSalt = 10;

module.exports = [
  {
    nom: "Maggie",
    prenom: "Ray",
    classe: "do",
    email: "maggieray@waterbaby.com",
    telephone: "+33 (964) 423-3341",
    role: "INFIRMIER.E",
    genre: "female",
    etablissement: 1,
    parent: {
      nom: "Herrera",
      prenom: "Horn",
      email: "herrerahorn@waterbaby.com",
      telephone: "+33 (864) 596-2079"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Nash",
    prenom: "Combs",
    classe: "dolor",
    email: "nashcombs@waterbaby.com",
    telephone: "+33 (954) 600-3455",
    role: "PRINCIPAL.E",
    genre: "male",
    etablissement: 1,
    parent: {
      nom: "Decker",
      prenom: "Guthrie",
      email: "deckerguthrie@waterbaby.com",
      telephone: "+33 (902) 542-3750"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Bradford",
    prenom: "Sargent",
    classe: "nostrud",
    email: "bradfordsargent@waterbaby.com",
    telephone: "+33 (828) 485-3523",
    role: "ASSISTANT.E D'EDUCATION",
    genre: "male",
    etablissement: 0,
    parent: {
      nom: "Rhoda",
      prenom: "Pitts",
      email: "rhodapitts@waterbaby.com",
      telephone: "+33 (805) 527-3994"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Walter",
    prenom: "Dickerson",
    classe: "quis",
    email: "walterdickerson@waterbaby.com",
    telephone: "+33 (992) 425-3092",
    role: "CPE",
    genre: "male",
    etablissement: 0,
    parent: {
      nom: "Bertha",
      prenom: "Lyons",
      email: "berthalyons@waterbaby.com",
      telephone: "+33 (909) 413-3699"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Miller",
    prenom: "Stephenson",
    classe: "anim",
    email: "millerstephenson@waterbaby.com",
    telephone: "+33 (904) 590-2408",
    role: "ASSISTANT.E D'EDUCATION",
    genre: "male",
    etablissement: 1,
    parent: {
      nom: "Andrews",
      prenom: "Massey",
      email: "andrewsmassey@waterbaby.com",
      telephone: "+33 (926) 472-3990"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Isabelle",
    prenom: "Nguyen",
    classe: "exercitation",
    email: "isabellenguyen@waterbaby.com",
    telephone: "+33 (924) 598-3015",
    role: "ASSISTANT.E D'EDUCATION",
    genre: "female",
    etablissement: 0,
    parent: {
      nom: "Gordon",
      prenom: "Barrera",
      email: "gordonbarrera@waterbaby.com",
      telephone: "+33 (892) 428-3132"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Henderson",
    prenom: "Holloway",
    classe: "dolore",
    email: "hendersonholloway@waterbaby.com",
    telephone: "+33 (841) 449-3695",
    role: "PROFESSEUR.E",
    genre: "male",
    etablissement: 0,
    parent: {
      nom: "Clay",
      prenom: "Tucker",
      email: "claytucker@waterbaby.com",
      telephone: "+33 (849) 537-2441"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Gates",
    prenom: "Collins",
    classe: "aliquip",
    email: "gatescollins@waterbaby.com",
    telephone: "+33 (871) 587-2441",
    role: "INFIRMIER.E",
    genre: "male",
    etablissement: 0,
    parent: {
      nom: "Violet",
      prenom: "Stanton",
      email: "violetstanton@waterbaby.com",
      telephone: "+33 (885) 458-3933"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Kelley",
    prenom: "Valencia",
    classe: "eiusmod",
    email: "kelleyvalencia@waterbaby.com",
    telephone: "+33 (935) 464-2088",
    role: "PRINCIPAL.E",
    genre: "female",
    etablissement: 0,
    parent: {
      nom: "Ford",
      prenom: "Knight",
      email: "fordknight@waterbaby.com",
      telephone: "+33 (900) 597-2001"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Luisa",
    prenom: "Mccullough",
    classe: "reprehenderit",
    email: "luisamccullough@waterbaby.com",
    telephone: "+33 (837) 578-2008",
    role: "CPE",
    genre: "female",
    etablissement: 0,
    parent: {
      nom: "Kay",
      prenom: "Oconnor",
      email: "kayoconnor@waterbaby.com",
      telephone: "+33 (887) 416-2462"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Espinoza",
    prenom: "Phillips",
    classe: "commodo",
    email: "espinozaphillips@waterbaby.com",
    telephone: "+33 (897) 426-2603",
    role: "PROFESSEUR.E",
    genre: "male",
    etablissement: 0,
    parent: {
      nom: "Jana",
      prenom: "Yang",
      email: "janayang@waterbaby.com",
      telephone: "+33 (879) 566-2027"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Daniel",
    prenom: "Huffman",
    classe: "magna",
    email: "danielhuffman@waterbaby.com",
    telephone: "+33 (945) 494-2053",
    role: "ASSISTANT.E D'EDUCATION",
    genre: "male",
    etablissement: 1,
    parent: {
      nom: "Jenna",
      prenom: "Mosley",
      email: "jennamosley@waterbaby.com",
      telephone: "+33 (912) 596-3523"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Tabatha",
    prenom: "Mccoy",
    classe: "voluptate",
    email: "tabathamccoy@waterbaby.com",
    telephone: "+33 (978) 404-2384",
    role: "ELEVE",
    genre: "female",
    etablissement: 1,
    parent: {
      nom: "Benita",
      prenom: "Tyler",
      email: "benitatyler@waterbaby.com",
      telephone: "+33 (966) 546-3767"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Ingram",
    prenom: "Cherry",
    classe: "commodo",
    email: "ingramcherry@waterbaby.com",
    telephone: "+33 (958) 594-2374",
    role: "ASSISTANT.E D'EDUCATION",
    genre: "male",
    etablissement: 1,
    parent: {
      nom: "Wilda",
      prenom: "Herrera",
      email: "wildaherrera@waterbaby.com",
      telephone: "+33 (920) 586-2763"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Patrice",
    prenom: "David",
    classe: "pariatur",
    email: "patricedavid@waterbaby.com",
    telephone: "+33 (872) 589-3489",
    role: "PRINCIPAL.E",
    genre: "female",
    etablissement: 0,
    parent: {
      nom: "Hendricks",
      prenom: "Rodgers",
      email: "hendricksrodgers@waterbaby.com",
      telephone: "+33 (917) 462-2103"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Wooten",
    prenom: "Chambers",
    classe: "fugiat",
    email: "wootenchambers@waterbaby.com",
    telephone: "+33 (929) 500-2695",
    role: "CPE",
    genre: "male",
    etablissement: 1,
    parent: {
      nom: "Marcia",
      prenom: "Alvarado",
      email: "marciaalvarado@waterbaby.com",
      telephone: "+33 (820) 542-2721"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Tracie",
    prenom: "Whitfield",
    classe: "sint",
    email: "traciewhitfield@waterbaby.com",
    telephone: "+33 (908) 548-3685",
    role: "PROFESSEUR.E",
    genre: "female",
    etablissement: 0,
    parent: {
      nom: "Jeannine",
      prenom: "Lara",
      email: "jeanninelara@waterbaby.com",
      telephone: "+33 (918) 429-3779"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Rice",
    prenom: "Carroll",
    classe: "tempor",
    email: "ricecarroll@waterbaby.com",
    telephone: "+33 (814) 563-3531",
    role: "PRINCIPAL.E",
    genre: "male",
    etablissement: 1,
    parent: {
      nom: "June",
      prenom: "Bridges",
      email: "junebridges@waterbaby.com",
      telephone: "+33 (849) 540-3738"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Vang",
    prenom: "Haley",
    classe: "Lorem",
    email: "vanghaley@waterbaby.com",
    telephone: "+33 (892) 441-2533",
    role: "PROFESSEUR.E",
    genre: "male",
    etablissement: 0,
    parent: {
      nom: "Valeria",
      prenom: "Greene",
      email: "valeriagreene@waterbaby.com",
      telephone: "+33 (923) 581-2592"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Cleo",
    prenom: "Monroe",
    classe: "exercitation",
    email: "cleomonroe@waterbaby.com",
    telephone: "+33 (966) 401-2791",
    role: "CPE",
    genre: "female",
    etablissement: 0,
    parent: {
      nom: "Soto",
      prenom: "Cleveland",
      email: "sotocleveland@waterbaby.com",
      telephone: "+33 (880) 468-2729"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Wolfe",
    prenom: "Reynolds",
    classe: "in",
    email: "wolfereynolds@waterbaby.com",
    telephone: "+33 (905) 591-3653",
    role: "CPE",
    genre: "male",
    etablissement: 0,
    parent: {
      nom: "Janna",
      prenom: "Walton",
      email: "jannawalton@waterbaby.com",
      telephone: "+33 (842) 445-3840"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Alfreda",
    prenom: "Sykes",
    classe: "reprehenderit",
    email: "alfredasykes@waterbaby.com",
    telephone: "+33 (887) 593-3212",
    role: "PROFESSEUR.E",
    genre: "female",
    etablissement: 1,
    parent: {
      nom: "Oneal",
      prenom: "Oneal",
      email: "onealoneal@waterbaby.com",
      telephone: "+33 (808) 454-2120"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Pena",
    prenom: "Schwartz",
    classe: "proident",
    email: "penaschwartz@waterbaby.com",
    telephone: "+33 (822) 483-3916",
    role: "ASSISTANT.E D'EDUCATION",
    genre: "male",
    etablissement: 0,
    parent: {
      nom: "Foley",
      prenom: "Sweet",
      email: "foleysweet@waterbaby.com",
      telephone: "+33 (903) 418-2547"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Goodman",
    prenom: "Simon",
    classe: "do",
    email: "goodmansimon@waterbaby.com",
    telephone: "+33 (921) 466-2565",
    role: "PROFESSEUR.E",
    genre: "male",
    etablissement: 1,
    parent: {
      nom: "Bonner",
      prenom: "Nunez",
      email: "bonnernunez@waterbaby.com",
      telephone: "+33 (904) 471-2217"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Julie",
    prenom: "Patrick",
    classe: "esse",
    email: "juliepatrick@waterbaby.com",
    telephone: "+33 (816) 462-3998",
    role: "INFIRMIER.E",
    genre: "female",
    etablissement: 0,
    parent: {
      nom: "Branch",
      prenom: "Clay",
      email: "branchclay@waterbaby.com",
      telephone: "+33 (824) 570-2866"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Mercado",
    prenom: "Snow",
    classe: "nisi",
    email: "mercadosnow@waterbaby.com",
    telephone: "+33 (963) 413-3343",
    role: "CPE",
    genre: "male",
    etablissement: 1,
    parent: {
      nom: "Colleen",
      prenom: "Giles",
      email: "colleengiles@waterbaby.com",
      telephone: "+33 (895) 451-3965"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Judy",
    prenom: "Campos",
    classe: "qui",
    email: "judycampos@waterbaby.com",
    telephone: "+33 (973) 511-3421",
    role: "INFIRMIER.E",
    genre: "female",
    etablissement: 1,
    parent: {
      nom: "Perkins",
      prenom: "Tran",
      email: "perkinstran@waterbaby.com",
      telephone: "+33 (807) 479-2162"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Hubbard",
    prenom: "Watson",
    classe: "laboris",
    email: "hubbardwatson@waterbaby.com",
    telephone: "+33 (977) 538-2546",
    role: "INFIRMIER.E",
    genre: "male",
    etablissement: 0,
    parent: {
      nom: "Winnie",
      prenom: "Lambert",
      email: "winnielambert@waterbaby.com",
      telephone: "+33 (886) 446-3589"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Aurelia",
    prenom: "Mccall",
    classe: "consequat",
    email: "aureliamccall@waterbaby.com",
    telephone: "+33 (920) 449-2938",
    role: "ASSISTANT.E D'EDUCATION",
    genre: "female",
    etablissement: 1,
    parent: {
      nom: "Miles",
      prenom: "Spears",
      email: "milesspears@waterbaby.com",
      telephone: "+33 (815) 551-2753"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Lourdes",
    prenom: "Rogers",
    classe: "cupidatat",
    email: "lourdesrogers@waterbaby.com",
    telephone: "+33 (857) 582-2245",
    role: "PRINCIPAL.E",
    genre: "female",
    etablissement: 0,
    parent: {
      nom: "Sanders",
      prenom: "Koch",
      email: "sanderskoch@waterbaby.com",
      telephone: "+33 (876) 495-2959"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Hensley",
    prenom: "Bolton",
    classe: "veniam",
    email: "hensleybolton@waterbaby.com",
    telephone: "+33 (863) 521-2207",
    role: "PRINCIPAL.E",
    genre: "male",
    etablissement: 0,
    parent: {
      nom: "Turner",
      prenom: "Hancock",
      email: "turnerhancock@waterbaby.com",
      telephone: "+33 (969) 531-2767"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Hopkins",
    prenom: "Sampson",
    classe: "ullamco",
    email: "hopkinssampson@waterbaby.com",
    telephone: "+33 (911) 444-3078",
    role: "ELEVE",
    genre: "male",
    etablissement: 0,
    parent: {
      nom: "Lucille",
      prenom: "Branch",
      email: "lucillebranch@waterbaby.com",
      telephone: "+33 (827) 422-2598"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Nora",
    prenom: "Smith",
    classe: "laborum",
    email: "norasmith@waterbaby.com",
    telephone: "+33 (894) 590-3437",
    role: "PRINCIPAL.E",
    genre: "female",
    etablissement: 0,
    parent: {
      nom: "Ines",
      prenom: "Barber",
      email: "inesbarber@waterbaby.com",
      telephone: "+33 (816) 501-2660"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Edwards",
    prenom: "Gibson",
    classe: "adipisicing",
    email: "edwardsgibson@waterbaby.com",
    telephone: "+33 (992) 421-3239",
    role: "ASSISTANT.E D'EDUCATION",
    genre: "male",
    etablissement: 0,
    parent: {
      nom: "Veronica",
      prenom: "Hester",
      email: "veronicahester@waterbaby.com",
      telephone: "+33 (889) 481-3881"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Jolene",
    prenom: "Donaldson",
    classe: "laboris",
    email: "jolenedonaldson@waterbaby.com",
    telephone: "+33 (945) 547-2093",
    role: "ELEVE",
    genre: "female",
    etablissement: 1,
    parent: {
      nom: "Marcella",
      prenom: "Melendez",
      email: "marcellamelendez@waterbaby.com",
      telephone: "+33 (935) 586-2865"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Mccullough",
    prenom: "Talley",
    classe: "cillum",
    email: "mcculloughtalley@waterbaby.com",
    telephone: "+33 (969) 535-3881",
    role: "ASSISTANT.E D'EDUCATION",
    genre: "male",
    etablissement: 1,
    parent: {
      nom: "Alana",
      prenom: "Tyson",
      email: "alanatyson@waterbaby.com",
      telephone: "+33 (836) 447-2062"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Kemp",
    prenom: "Watts",
    classe: "ullamco",
    email: "kempwatts@waterbaby.com",
    telephone: "+33 (978) 439-3349",
    role: "PROFESSEUR.E",
    genre: "male",
    etablissement: 0,
    parent: {
      nom: "Sheppard",
      prenom: "Mcguire",
      email: "sheppardmcguire@waterbaby.com",
      telephone: "+33 (986) 490-3554"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Terry",
    prenom: "Holmes",
    classe: "est",
    email: "terryholmes@waterbaby.com",
    telephone: "+33 (933) 506-3208",
    role: "PRINCIPAL.E",
    genre: "female",
    etablissement: 1,
    parent: {
      nom: "Caroline",
      prenom: "Anthony",
      email: "carolineanthony@waterbaby.com",
      telephone: "+33 (891) 564-2309"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Lilly",
    prenom: "Mcmillan",
    classe: "eu",
    email: "lillymcmillan@waterbaby.com",
    telephone: "+33 (870) 499-2057",
    role: "INFIRMIER.E",
    genre: "female",
    etablissement: 0,
    parent: {
      nom: "Jeannette",
      prenom: "Hernandez",
      email: "jeannettehernandez@waterbaby.com",
      telephone: "+33 (951) 462-2591"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Hooper",
    prenom: "Gallagher",
    classe: "consectetur",
    email: "hoopergallagher@waterbaby.com",
    telephone: "+33 (887) 402-3670",
    role: "ELEVE",
    genre: "male",
    etablissement: 0,
    parent: {
      nom: "Carpenter",
      prenom: "Hahn",
      email: "carpenterhahn@waterbaby.com",
      telephone: "+33 (893) 423-2273"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Baldwin",
    prenom: "Miranda",
    classe: "est",
    email: "baldwinmiranda@waterbaby.com",
    telephone: "+33 (928) 411-2592",
    role: "CPE",
    genre: "male",
    etablissement: 1,
    parent: {
      nom: "Patti",
      prenom: "Chavez",
      email: "pattichavez@waterbaby.com",
      telephone: "+33 (866) 560-2366"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Rutledge",
    prenom: "Bright",
    classe: "duis",
    email: "rutledgebright@waterbaby.com",
    telephone: "+33 (821) 447-3968",
    role: "ELEVE",
    genre: "male",
    etablissement: 0,
    parent: {
      nom: "Penny",
      prenom: "Walters",
      email: "pennywalters@waterbaby.com",
      telephone: "+33 (902) 449-2280"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Cheryl",
    prenom: "Hyde",
    classe: "dolore",
    email: "cherylhyde@waterbaby.com",
    telephone: "+33 (906) 466-3515",
    role: "INFIRMIER.E",
    genre: "female",
    etablissement: 0,
    parent: {
      nom: "Finch",
      prenom: "Patel",
      email: "finchpatel@waterbaby.com",
      telephone: "+33 (939) 477-2184"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Austin",
    prenom: "Parker",
    classe: "ea",
    email: "austinparker@waterbaby.com",
    telephone: "+33 (996) 577-3988",
    role: "PRINCIPAL.E",
    genre: "male",
    etablissement: 0,
    parent: {
      nom: "Ivy",
      prenom: "Carlson",
      email: "ivycarlson@waterbaby.com",
      telephone: "+33 (930) 465-2797"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Naomi",
    prenom: "Page",
    classe: "aliquip",
    email: "naomipage@waterbaby.com",
    telephone: "+33 (999) 429-2389",
    role: "INFIRMIER.E",
    genre: "female",
    etablissement: 1,
    parent: {
      nom: "Maxine",
      prenom: "Daniel",
      email: "maxinedaniel@waterbaby.com",
      telephone: "+33 (812) 526-3654"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Marsha",
    prenom: "Levy",
    classe: "reprehenderit",
    email: "marshalevy@waterbaby.com",
    telephone: "+33 (868) 589-3909",
    role: "CPE",
    genre: "female",
    etablissement: 0,
    parent: {
      nom: "Crosby",
      prenom: "Bender",
      email: "crosbybender@waterbaby.com",
      telephone: "+33 (992) 518-3491"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Fanny",
    prenom: "Harding",
    classe: "magna",
    email: "fannyharding@waterbaby.com",
    telephone: "+33 (818) 559-2254",
    role: "PROFESSEUR.E",
    genre: "female",
    etablissement: 0,
    parent: {
      nom: "Lydia",
      prenom: "Marshall",
      email: "lydiamarshall@waterbaby.com",
      telephone: "+33 (847) 488-2611"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Margery",
    prenom: "Case",
    classe: "dolor",
    email: "margerycase@waterbaby.com",
    telephone: "+33 (921) 405-3678",
    role: "CPE",
    genre: "female",
    etablissement: 0,
    parent: {
      nom: "Kennedy",
      prenom: "Coffey",
      email: "kennedycoffey@waterbaby.com",
      telephone: "+33 (991) 490-2410"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Hammond",
    prenom: "Downs",
    classe: "eu",
    email: "hammonddowns@waterbaby.com",
    telephone: "+33 (819) 487-3576",
    role: "ELEVE",
    genre: "male",
    etablissement: 1,
    parent: {
      nom: "Ava",
      prenom: "Robles",
      email: "avarobles@waterbaby.com",
      telephone: "+33 (939) 576-3310"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    nom: "Odonnell",
    prenom: "Carter",
    classe: "quis",
    email: "odonnellcarter@waterbaby.com",
    telephone: "+33 (804) 495-3552",
    role: "CPE",
    genre: "male",
    etablissement: 0,
    parent: {
      nom: "Martha",
      prenom: "Lynn",
      email: "marthalynn@waterbaby.com",
      telephone: "+33 (878) 554-3379"
    },
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt))
  }
];
