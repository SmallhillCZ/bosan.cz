var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	"login": { type: String, index: true },
	"name": String
});

module.exports = mongoose.model('User', userSchema);