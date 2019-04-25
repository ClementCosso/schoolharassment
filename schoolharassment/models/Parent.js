const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const parentSchema = new Schema({
  nom: String,
  prenom: String,
  email: String,
  telephone: String,
  eleve:[ { type : Schema.Types.ObjectId, ref: 'Eleve' } ]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Parent = mongoose.model('Parent', parentSchema);
module.exports = Parent;