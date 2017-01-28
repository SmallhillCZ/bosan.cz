var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	"email": { type: String, unique: true },
	"password": String,
	"name": String,
	"roles": [String]
});

module.exports = mongoose.model('User', userSchema);