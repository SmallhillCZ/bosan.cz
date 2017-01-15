var mongoose = require('mongoose');

var memberSchema = mongoose.Schema({
	
	"name": {
		"first": String,
		"last": String,
	},
	
	"nickname": String,
	"squad": String,
	"role": String,
	"rank": String,
	
	"address": {
		"street": String,
		"streetNo": String,
		"city": String,
		"zip": String
	},
	
	"phone": {
		"mobile": String,
		"mother": String,
		"father": String
	}
	
});

module.exports = mongoose.model('Member', memberSchema);