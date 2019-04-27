const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eleveSchema = new Schema(
  {
    nom: String,
    prenom: String,
    classe: String,
    email: {
      type: String,
      match: /^.+@.+\..+$/,
      required: true
    },
    genre: { type: String, enum: ["M", "F"] },
    etablissement: [{ type: Schema.Types.ObjectId, ref: "Etablissement" }],
    parent: [{ type: Schema.Types.ObjectId, ref: "Parent" }],
    password: { type: String, required: true }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Eleve = mongoose.model("Eleve", eleveSchema);
module.exports = Eleve;
