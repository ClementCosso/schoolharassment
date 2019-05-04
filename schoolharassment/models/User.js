//on ne s'en sert pas

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema(
  {
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    classe: { type: String },
    username: {
      type: String,
      match: /^.+@.+\..+$/,
      required: true,
      unique: true
    },
    telephone: { type: String },
    role: {
      type: String,
      enum: [
        "ELEVE",
        "PROFESSEUR.E",
        "CPE",
        "PRINCIPAL.E",
        "INFIRMIER.E",
        "ASSISTANT.E D'EDUCATION"
      ],
      required: true
    },
    genre: {
      type: String,
      enum: [
        "male",
        "female"
        ],
        required: true
      },
    etablissement: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Etablissement'}],
    parent_nom: { type: String },
    parent_prenom: { type: String },
    parent_email: { type: String },
    parent_telephone: { type: String },
    password: { type: String, required: true }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
