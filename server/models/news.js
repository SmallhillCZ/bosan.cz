var mongoose = require('mongoose');

var newsSchema = mongoose.Schema({
	"title": String,
	"text":String,
	"date": Date,
	"creator": {type: mongoose.Schema.Types.ObjectId, ref: "User"}
});

module.exports = mongoose.model('News', newsSchema);