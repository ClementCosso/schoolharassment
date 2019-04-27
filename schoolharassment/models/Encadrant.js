const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const encadrantSchema = new Schema(
  {
    nom: String,
    prenom: String,
    etablissement: { type: Schema.Types.ObjectId, ref: "Etablissement" },
    role: {
      type: String,
      enum: [
        "PROFESSEUR.E",
        "CPE",
        "PRINCIPAL.E",
        "INFIRMIER.E",
        "ASSISTANT.E D'EDUCATION"
      ]
    },
    telephone: String,
    email: {
      type: String,
      match: /^.+@.+\..+$/,
      required: true
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

const Encadrant = mongoose.model("Encadrant", encadrantSchema);
module.exports = Encadrant;
