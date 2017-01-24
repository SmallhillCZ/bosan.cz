var mongoose = require('mongoose');

var schema = mongoose.Schema({
	"title": String,
	"url": { type: String, index: {unique: true} },
	"body": String,
	"files": [String],
	"created": Date,
	"changed": Date,
	"changes": [{
		"user":{type: mongoose.Schema.Types.ObjectId, ref: "User"},
		"changed": Date
	}]
});

module.exports = mongoose.model('Page', schema);