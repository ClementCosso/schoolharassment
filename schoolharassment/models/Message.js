const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const messageSchema = new Schema(
	{
		emetteur 	: [{type: mongoose.SchemaTypes.ObjectId, ref: 'User'}],
		recepteur 	: [{type: mongoose.SchemaTypes.ObjectId, ref: 'User'}],
	 	sujet		: { type: String, required: true },
	  	contenu		: { type: String, required: true },
	  	statut		: { type: String, required: true },
	  	lu			: { type: String, required: true }
	},
	{
	  	timestamps	: { createdAt: 'created_at', updatedAt: 'updated_at' }
	}
);

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;