const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const conversationSchema = new Schema({
	id_message: [ { type : Schema.Types.ObjectId, ref: 'Message' } ],
 	emetteur: String,
  	recepteur: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Conversation = mongoose.model('Conversation', conversationSchema);
module.exports = Conversation;