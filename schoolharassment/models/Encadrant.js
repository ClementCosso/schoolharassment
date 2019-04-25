const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const encadrantSchema = new Schema({
  nom: String,
  prenom: String,
  etablissement: String,
  role: ['PROFESSEUR.E', 'CPE', 'PRINCIPAL.E', 'INFIRMIER.E', 'ASSISTANT.E D\'EDUCATION'],
  telephone: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Encadrant = mongoose.model('Encadrant', encadrantSchema);
module.exports = Encadrant;