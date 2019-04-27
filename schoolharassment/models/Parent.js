const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const parentSchema = new Schema(
  {
    nom: String,
    prenom: String,
    email: {
      type: String,
      match: /^.+@.+\..+$/,
      required: true
    },
    telephone: String,

    password: { type: String, required: true }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Parent = mongoose.model("Parent", parentSchema);
module.exports = Parent;
