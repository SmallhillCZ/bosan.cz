var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
	"name": String,
	"url": { type: String, index: true },
	"perex": String,
	"description":String,
	"startDate": Date,
	"startPlace": String,
	"endDate": Date,
	"endPlace": String,
	"rsvp": [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
});

module.exports = mongoose.model('Event', eventSchema);