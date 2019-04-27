const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eleveSchema = new Schema(
  {
    nom: String,
    prenom: String,
    classe: String,
    email: String,
    etablissement: [{ type: Schema.Types.ObjectId, ref: "Etablissement" }],
    parent: [{ type: Schema.Types.ObjectId, ref: "Parent" }]
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
