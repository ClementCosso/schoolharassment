//on ne s'en sert pas

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    classe: { type: String },
    email: {
      type: String,
      match: /^.+@.+\..+$/,
      required: true,
      unique: true
    },
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
    genre: { type: String, enum: ["male", "female"] },
    etablissement: {
      type: Schema.Types.ObjectId,
      ref: "Etablissement",
      required: true
    },
    parent: {
      nom: { type: String, required: true },
      prenom: { type: String, required: true },
      email: { type: String, match: /^.+@.+\..+$/, required: true },
      telephone: { type: String, required: true }
    },
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
