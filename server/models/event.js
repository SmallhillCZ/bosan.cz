var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
	"name": String,
	"url": { type: String, index: true },
	"description":String,
	"from": Date,
	"till": Date,
	"rsvp": [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
});

module.exports = mongoose.model('Event', eventSchema);