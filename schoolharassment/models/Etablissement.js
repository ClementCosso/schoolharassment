const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const etablissementSchema = new Schema({
  nom: String,
  adresse: String,
  ville: String,
  cp: Number,
  departement: String,
  telephone: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Etablissement = mongoose.model('Etablissement', etablissementSchema);
module.exports = Etablissement;